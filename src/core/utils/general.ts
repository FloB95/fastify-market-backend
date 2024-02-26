import { type ZodIssue } from 'zod'

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export function mergeObjects<T>(original: T, updates: Partial<T>): T {
  return {
    ...original,
    ...updates,
  }
}

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
