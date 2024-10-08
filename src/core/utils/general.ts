import { type ZodIssue } from 'zod'

/**
 * Asynchronously pauses execution for a specified amount of time.
 * @param {number} ms - The number of milliseconds to sleep.
 * @returns {Promise<void>} A promise that resolves after the specified time.
 */
export const sleep = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Generates a random integer within a specified range.
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @returns {number} A random integer within the specified range.
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * Merges two objects of the same type, with the second object overriding any overlapping properties of the first.
 * @template T - The type of objects being merged.
 * @param {T} original - The original object to be merged into.
 * @param {Partial<T>} updates - The object containing properties to merge into the original.
 * @returns {T} The merged object.
 */
export function mergeObjects<T>(original: T, updates: Partial<T>): T {
  return {
    ...original,
    ...updates,
  }
}

/**
 * Merges an array of ZodIssue objects, consolidating duplicate errors by combining their paths.
 * @param {ZodIssue[]} errors - An array of ZodIssue objects to merge.
 * @returns {any[]} An array of merged ZodIssue objects.
 */
export function mergeZodErrorObjects(errors: ZodIssue[]): any[] {
  const mergedErrors = []

  for (const error of errors) {
    const existingError = mergedErrors.find((e) => {
      const keys = Object.keys(e)
      return keys.every((key) => key === 'path' || e[key] === error[key])
    })

    if (existingError) {
      existingError.path = [...existingError.path, ...error.path]
    } else {
      mergedErrors.push(error)
    }
  }

  return mergedErrors
}

/**
 * Compares two values for deep equality.
 * @param {*} value1 - The first value to compare.
 * @param {*} value2 - The second value to compare.
 * @returns {boolean} - Returns true if the values are deeply equal, otherwise false.
 */
function deepEqual(value1, value2) {
  // Check if both values are objects (arrays or objects)
  if (typeof value1 === 'object' && typeof value2 === 'object') {
    return JSON.stringify(value1) === JSON.stringify(value2)
  }
  // For non-objects, use strict equality
  return value1 === value2
}

/**
 * Computes the difference between two objects.
 * @param {Object} obj1 - The first object.
 * @param {Object} obj2 - The second object.
 * @param {Array<string>} [ignoreProperties=[]] - An array of property names to ignore.
 * @returns {Object} - An object representing the differences. Each key in the returned object
 *                     corresponds to a property that differs between obj1 and obj2, with the
 *                     old and new values.
 */
export function objDiff(obj1, obj2, ignoreProperties = []) {
  const diff = {}

  for (const key in obj1) {
    // Skip the properties in the ignoreProperties array
    if (ignoreProperties.includes(key)) {
      continue
    }
    // Compare the properties using deepEqual
    if (!deepEqual(obj1[key], obj2[key])) {
      diff[key] = {
        oldValue: obj1[key],
        newValue: obj2[key],
      }
    }
  }

  return diff
}
