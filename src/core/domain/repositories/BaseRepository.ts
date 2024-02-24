import { type WhereConditions } from '~/core/infrastructure/db/types'

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
