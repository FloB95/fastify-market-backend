import zodToJsonSchema from 'zod-to-json-schema'
import { CreateUserDtoSchema } from '~/core/domain/dtos/user/ICreateUserDto'
import { UserResponseDtoSchema } from '~/core/domain/dtos/user/IUserResponseDto'
import { DefaultIdQueryParamSchema } from '~/core/presentation/http/validation/BaseRequestSchema'
import { NotFoundErrorResponseJsonSchema } from '../errors/NotFoundErrorSchema'
import { type IExtendedFastifySchema } from '../../fastify/interfaces/Defaults'

const GetUserJsonSchema = zodToJsonSchema(CreateUserDtoSchema, {
  $refStrategy: 'none',
  definitions: {
    params: DefaultIdQueryParamSchema,
    response: UserResponseDtoSchema,
  },
})

export const GetUserSchema: IExtendedFastifySchema = {
  description: 'Get a user by id',
  tags: ['User'],
  params: GetUserJsonSchema.definitions.params,
  response: {
    200: GetUserJsonSchema.definitions.response,
    404: NotFoundErrorResponseJsonSchema.definitions.response,
  },
}
