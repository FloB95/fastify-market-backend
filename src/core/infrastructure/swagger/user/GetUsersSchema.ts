import zodToJsonSchema from 'zod-to-json-schema'
import { UserPaginationResponseSchema } from '~/core/domain/dtos/user/IUserPaginatedResponseDto'
import { GetUsersQueryParamsSwaggerSchema } from '~/core/presentation/http/validation/user/UsersRequestDtoSchema'
import { BadRequestErrorResponseJsonSchema } from '../errors/BadRequestSchema'
import { type IExtendedFastifySchema } from '../../fastify/interfaces/Defaults'
import { UnauthenticatedErrorResponseJsonSchema } from '../errors/UnauthenticatedErrorSchema'

export const UserPaginationResponseJsonSchema = zodToJsonSchema(
  UserPaginationResponseSchema,
  {
    $refStrategy: 'none',
    definitions: {
      querystring: GetUsersQueryParamsSwaggerSchema,
      response: UserPaginationResponseSchema,
    },
  },
)

export const GetUsersSchema: IExtendedFastifySchema = {
  description: 'Get all users paginated',
  tags: ['User'],
  querystring: UserPaginationResponseJsonSchema.definitions.querystring,
  response: {
    200: UserPaginationResponseJsonSchema.definitions.response,
    400: BadRequestErrorResponseJsonSchema.definitions.response,
    401: UnauthenticatedErrorResponseJsonSchema.definitions.response,
  },
}
