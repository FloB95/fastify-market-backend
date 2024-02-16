export interface IPaginationResult<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

interface IBaseRepository<T> {
  findAll(max: number): Promise<IPaginationResult<T>>
  findById(id: string): Promise<T | undefined>
  create(item: T): Promise<T>
  update(item: T): Promise<T>
  delete(id: string): Promise<boolean>
}

export default IBaseRepository
