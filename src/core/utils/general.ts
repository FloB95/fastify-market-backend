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
