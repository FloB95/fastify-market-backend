import { z } from 'zod'

export const PaginationOptionsSchema = z.object({
  page: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => Number.isInteger(val) && val > 0, {
      message: 'Page must be a positive integer',
    })
    .default('1'),
  limit: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => Number.isInteger(val) && val > 0, {
      message: 'Limit must be a positive integer',
    })
    .default('10'),
})
export interface IPaginationResult<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

interface IBaseRepository<T> {
  findAll(max: number): Promise<T[]>
  findById(id: string): Promise<T | undefined>
  create(item: T): Promise<T>
  update(item: T): Promise<T>
  delete(id: string): Promise<boolean>
  generateId(): Promise<string>
}

export default IBaseRepository
