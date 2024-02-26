import zodToJsonSchema from 'zod-to-json-schema'
import { CreateUserDtoSchema } from '~/core/domain/dtos/user/ICreateUserDto'
import { UserResponseDtoSchema } from '~/core/domain/dtos/user/IUserResponseDto'
import { type ExtendedFastifySchema } from '../../fastify/FastifySwagger'
import { BadRequestErrorResponseJsonSchema } from '../errors/BadRequestSchema'

const CreateUserJsonSchema = zodToJsonSchema(CreateUserDtoSchema, {
  $refStrategy: 'none',
  definitions: {
    body: CreateUserDtoSchema,
    response: UserResponseDtoSchema,
  },
})

export const CreateUserSchema: ExtendedFastifySchema = {
  description: 'Create a new user',
  tags: ['User'],
  body: CreateUserJsonSchema.definitions.body,
  response: {
    201: CreateUserJsonSchema.definitions.response,
    400: BadRequestErrorResponseJsonSchema.definitions.response,
  },
}
