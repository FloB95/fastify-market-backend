import { type ExtendedFastifySchema } from '~/core/domain/documentation/FastifySwagger'
import {
  CreateUserJsonSchema,
  DeleteUserJsonSchema,
  GetUserJsonSchema,
  UpdateUserJsonSchema,
} from '../application/dtos/UserCreateDto'
import { UserPaginationResponseJsonSchema } from '../application/dtos/UserResponseDto'
import { BadRequestErrorResponseJsonSchema } from '~/core/errors/http/BadRequestError'
import { NotFoundErrorResponseJsonSchema } from '~/core/errors/http/NotFoundError'

export const GetUsersSchema: ExtendedFastifySchema = {
  description: 'Get all users paginated',
  tags: ['User'],
  querystring: UserPaginationResponseJsonSchema.definitions.querystring,
  response: {
    200: UserPaginationResponseJsonSchema.definitions.response,
    400: BadRequestErrorResponseJsonSchema.definitions.response,
  },
}

export const GetUserSchema: ExtendedFastifySchema = {
  description: 'Get a user by id',
  tags: ['User'],
  params: GetUserJsonSchema.definitions.params,
  response: {
    200: GetUserJsonSchema.definitions.response,
    404: NotFoundErrorResponseJsonSchema.definitions.response,
  },
}

export const CreateUserSchema: ExtendedFastifySchema = {
  description: 'Create a new user',
  tags: ['User'],
  body: CreateUserJsonSchema.definitions.body,
  response: {
    201: CreateUserJsonSchema.definitions.response,
    400: BadRequestErrorResponseJsonSchema.definitions.response,
  },
}

export const UpdateUserSchema: ExtendedFastifySchema = {
  description: 'Update a new user',
  tags: ['User'],
  params: UpdateUserJsonSchema.definitions.params,
  body: UpdateUserJsonSchema.definitions.body,
  response: {
    200: UpdateUserJsonSchema.definitions.response,
    400: BadRequestErrorResponseJsonSchema.definitions.response,
    404: NotFoundErrorResponseJsonSchema.definitions.response,
  },
}

export const DeleteUserSchema: ExtendedFastifySchema = {
  description: 'Delete a new user',
  tags: ['User'],
  params: DeleteUserJsonSchema.definitions.params,
  response: {
    200: {
      type: 'boolean',
    },
    404: NotFoundErrorResponseJsonSchema.definitions.response,
  },
}
