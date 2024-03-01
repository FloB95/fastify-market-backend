import zodToJsonSchema from 'zod-to-json-schema'
import { UserPaginationResponseSchema } from '~/core/domain/dtos/user/IUserPaginatedResponseDto'
import { GetUsersQueryParamsSchema } from '~/core/presentation/http/validation/user/IUsersRequestDto'
import { BadRequestErrorResponseJsonSchema } from '../errors/BadRequestSchema'
import { type IExtendedFastifySchema } from '../../fastify/interfaces/Defaults'

export const UserPaginationResponseJsonSchema = zodToJsonSchema(
  UserPaginationResponseSchema,
  {
    $refStrategy: 'none',
    definitions: {
      querystring: GetUsersQueryParamsSchema,
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
  },
}
