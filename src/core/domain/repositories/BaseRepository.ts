import { type ZodSchema, z } from 'zod'

export const DefaultIdParamSchema = z.object({
  id: z.string(),
})

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
  select: z
    .string()
    .optional()
    .describe(
      "String with comma separated fields from the entity's schema which will be selected. If not provided, all fields will be selected.",
    ),
  where: z.string().optional().describe('String with comma separated fields'),
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

export interface ISqlQueryFindBy<T> {
  limit: number
  offset: number
  select?: Partial<{ [K in keyof T]: boolean }>
  where?: Partial<{ [K in keyof T]: any }>
}

interface IBaseRepository<T> {
  findAll({ limit, offset, select, where }: ISqlQueryFindBy<T>): Promise<T[]>
  countTotal(): Promise<number>
  findOneById(id: string): Promise<T | undefined>
  create(item: T): Promise<void>
  update(item: T, updates: Partial<T>): Promise<void>
  delete(item: T): Promise<boolean>
  generateId(): Promise<string>
}

export default IBaseRepository
