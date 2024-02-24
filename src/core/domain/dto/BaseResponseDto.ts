import { type ZodSchema, z } from 'zod'

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
