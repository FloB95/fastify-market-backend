import { z } from 'zod'
import {
  DefaultDateWhereQueryParamSchema,
  DefaultEmailWhereQueryParamSchema,
  DefaultStringWhereQueryParamSchema,
  PaginationQueryParamsSchema,
} from '~/core/presentation/http/validation/BaseRequestSchema'

// Schema to validate the request query params for the GetUsers controller action
export const DefaultUserWhereSchema = z.object({
  firstname: DefaultStringWhereQueryParamSchema,
  lastname: DefaultStringWhereQueryParamSchema,
  email: DefaultEmailWhereQueryParamSchema,
  createdAt: DefaultDateWhereQueryParamSchema,
})
export type DefaultUserWhere = z.infer<typeof DefaultUserWhereSchema>

export const GetUsersQueryParamsSchema = PaginationQueryParamsSchema(
  DefaultUserWhereSchema,
)
