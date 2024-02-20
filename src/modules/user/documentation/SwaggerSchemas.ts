import { type ExtendedFastifySchema } from '~/core/interfaces/documentation/FastifySwagger'
import { CreateUserJsonSchema } from '../application/dtos/UserCreateDto'
import { UserPaginationResponseJsonSchema } from '../application/dtos/UserResponseDto'
import { BadRequestErrorResponseJsonSchema } from '~/core/errors/http/BadRequestError'

export const GetUsersSchema: ExtendedFastifySchema = {
  description: 'Get all users paginated',
  tags: ['User'],
  querystring: UserPaginationResponseJsonSchema.definitions.querystring,
  response: {
    200: UserPaginationResponseJsonSchema.definitions.response,
    400: BadRequestErrorResponseJsonSchema.definitions.response,
  },
}

export const CreateUserSchema: ExtendedFastifySchema = {
  description: 'Create a new user',
  validate: false,
  tags: ['User'],
  body: CreateUserJsonSchema.definitions.body,
  response: {
    201: CreateUserJsonSchema.definitions.response,
    400: BadRequestErrorResponseJsonSchema.definitions.response,
  },
}
