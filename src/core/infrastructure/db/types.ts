// Define the types for the `where` object
export type WhereField = {
  eq?: string | Date
  neq?: string | Date
  like?: string
  gt?: Date
  gte?: Date
  lt?: Date
  lte?: Date
}

export type WhereConditions<T> = {
  [K in keyof T]: WhereField
}
