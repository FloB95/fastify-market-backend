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

export interface ISqlQueryFindBy<T> {
  limit: number
  offset: number
  select?: Partial<{ [K in keyof T]: boolean }>
  where?: WhereConditions<T>
}

interface IBaseRepository<T> {
  table: any
  findAll({ limit, offset, select, where }: ISqlQueryFindBy<T>): Promise<T[]>
  countTotal(): Promise<number>
  findOneById(id: string): Promise<T | undefined>
  create(item: T): Promise<void>
  update(item: T, updates: Partial<T>): Promise<void>
  delete(item: T): Promise<boolean>
  generateId(): Promise<string>
}

export default IBaseRepository
