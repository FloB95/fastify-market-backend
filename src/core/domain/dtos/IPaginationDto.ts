import { type ZodSchema, z } from 'zod'

export const PaginationResponseDtoSchema = (dataSchema: ZodSchema) =>
  z.object({
    page: z.number(),
    limit: z.number(),
    total: z.number(),
    data: z.array(dataSchema),
  })

export interface IPaginationDto<T> {
  data: T[]
  total: number
  page: number
  limit: number
}
