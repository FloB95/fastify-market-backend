export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export function mergeObjects<T>(original: T, updates: Partial<T>): T {
  return {
    ...original,
    ...updates,
  }
}
