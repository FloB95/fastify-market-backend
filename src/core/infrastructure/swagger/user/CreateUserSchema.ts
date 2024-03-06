import zodToJsonSchema from 'zod-to-json-schema'
import { CreateUserDtoSchema } from '~/core/domain/dtos/user/ICreateUserDto'
import { UserResponseDtoSchema } from '~/core/domain/dtos/user/IUserResponseDto'
import { BadRequestErrorResponseJsonSchema } from '../errors/BadRequestSchema'
import { type IExtendedFastifySchema } from '../../fastify/interfaces/Defaults'
import { UnauthenticatedErrorResponseJsonSchema } from '../errors/UnauthenticatedErrorSchema'
import { UnauthorizedErrorResponseJsonSchema } from '../errors/UnauthorizedErrorSchema'

const CreateUserJsonSchema = zodToJsonSchema(CreateUserDtoSchema, {
  $refStrategy: 'none',
  definitions: {
    body: CreateUserDtoSchema,
    response: UserResponseDtoSchema,
  },
})

export const CreateUserSchema: IExtendedFastifySchema = {
  description: 'Create a new user',
  tags: ['User'],
  body: CreateUserJsonSchema.definitions.body,
  response: {
    201: CreateUserJsonSchema.definitions.response,
    400: BadRequestErrorResponseJsonSchema.definitions.response,
    401: UnauthenticatedErrorResponseJsonSchema.definitions.response,
    403: UnauthorizedErrorResponseJsonSchema.definitions.response,
  },
}
