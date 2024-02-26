import { z } from 'zod'

export const DefaultIdQueryParamSchema = z.object({
  id: z.string(),
})

export const DefaultStringWhereQueryParamSchema = z
  .object({
    eq: z.string(),
    neq: z.string(),
    like: z.string(),
  })
  .partial()
  .optional()
export type DefaultStringWhereQueryParam = z.infer<
  typeof DefaultStringWhereQueryParamSchema
>

export const DefaultEmailWhereQueryParamSchema = z
  .object({
    eq: z.string().email(),
    neq: z.string().email(),
    like: z.string(),
  })
  .partial()
  .optional()
export type DefaultEmailWhereQueryParam = z.infer<
  typeof DefaultEmailWhereQueryParamSchema
>

export const DefaultDateWhereQueryParamSchema = z
  .object({
    eq: z.string().transform((val) => new Date(val)),
    neq: z.string().transform((val) => new Date(val)),
    gt: z.string().transform((val) => new Date(val)),
    gte: z.string().transform((val) => new Date(val)),
    lt: z.string().transform((val) => new Date(val)),
    lte: z.string().transform((val) => new Date(val)),
  })
  .partial()
  .optional()
export type DefaultDateWhereQueryParam = z.infer<
  typeof DefaultDateWhereQueryParamSchema
>

export const PaginationQueryParamsSchema = (
  whereObj: z.ZodObject<any, any, any>,
) =>
  z.object({
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
    where: whereObj.partial().optional(),
  })
