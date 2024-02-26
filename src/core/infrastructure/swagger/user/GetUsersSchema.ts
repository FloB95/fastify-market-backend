import zodToJsonSchema from 'zod-to-json-schema'
import { UserPaginationResponseSchema } from '~/core/domain/dtos/user/IUserPaginatedResponseDto'
import { GetUsersQueryParamsSchema } from '~/core/presentation/http/validation/user/IUsersRequestDto'
import { type ExtendedFastifySchema } from '../../fastify/FastifySwagger'
import { BadRequestErrorResponseJsonSchema } from '../errors/BadRequestSchema'

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

export const GetUsersSchema: ExtendedFastifySchema = {
  description: 'Get all users paginated',
  tags: ['User'],
  querystring: UserPaginationResponseJsonSchema.definitions.querystring,
  response: {
    200: UserPaginationResponseJsonSchema.definitions.response,
    400: BadRequestErrorResponseJsonSchema.definitions.response,
  },
}
