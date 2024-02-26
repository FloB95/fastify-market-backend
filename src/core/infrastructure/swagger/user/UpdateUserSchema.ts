import zodToJsonSchema from 'zod-to-json-schema'
import { UpdateUserDtoSchema } from '~/core/domain/dtos/user/IUpdateUserDto'
import { UserResponseDtoSchema } from '~/core/domain/dtos/user/IUserResponseDto'
import { DefaultIdQueryParamSchema } from '~/core/presentation/http/validation/BaseRequestSchema'
import { type ExtendedFastifySchema } from '../../fastify/FastifySwagger'
import { BadRequestErrorResponseJsonSchema } from '../errors/BadRequestSchema'
import { NotFoundErrorResponseJsonSchema } from '../errors/NotFoundErrorSchema'

export const UpdateUserJsonSchema = zodToJsonSchema(UpdateUserDtoSchema, {
  $refStrategy: 'none',
  definitions: {
    params: DefaultIdQueryParamSchema,
    body: UpdateUserDtoSchema,
    response: UserResponseDtoSchema,
  },
})

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
