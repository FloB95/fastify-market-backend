import { type ZodSchema, z } from 'zod'

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

export const PaginationResponseSchema = (dataSchema: ZodSchema) =>
  z.object({
    page: z.number().default(1),
    limit: z.number().default(10),
    total: z.number(),
    data: z.array(dataSchema),
  })

export interface IPaginationResult<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

interface IBaseRepository<T> {
  findAll(max: number, offset: number): Promise<T[]>
  countTotal(): Promise<number>
  findById(id: string): Promise<T | undefined>
  create(item: T): Promise<T>
  update(item: T): Promise<T>
  delete(id: string): Promise<boolean>
  generateId(): Promise<string>
}

export default IBaseRepository
