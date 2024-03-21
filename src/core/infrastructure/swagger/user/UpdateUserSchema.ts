import zodToJsonSchema from 'zod-to-json-schema'
import { UpdateUserDtoSchema } from '~/core/domain/dtos/user/IUpdateUserDto'
import { UserResponseDtoSchema } from '~/core/domain/dtos/user/IUserResponseDto'
import { DefaultIdQueryParamSchema } from '~/core/presentation/http/validation/BaseRequestSchema'
import { BadRequestErrorResponseJsonSchema } from '../errors/BadRequestSchema'
import { NotFoundErrorResponseJsonSchema } from '../errors/NotFoundErrorSchema'
import { type IExtendedFastifySchema } from '../../fastify/interfaces/Defaults'
import { UnauthenticatedErrorResponseJsonSchema } from '../errors/UnauthenticatedErrorSchema'
import { UnauthorizedErrorResponseJsonSchema } from '../errors/UnauthorizedErrorSchema'

export const UpdateUserJsonSchema = zodToJsonSchema(UpdateUserDtoSchema, {
  $refStrategy: 'none',
  definitions: {
    params: DefaultIdQueryParamSchema,
    body: UpdateUserDtoSchema,
    response: UserResponseDtoSchema,
  },
})

export const UpdateUserSchema: IExtendedFastifySchema = {
  description: 'Update a new user',
  tags: ['User'],
  params: UpdateUserJsonSchema.definitions.params,
  body: UpdateUserJsonSchema.definitions.body,
  response: {
    200: UpdateUserJsonSchema.definitions.response,
    400: BadRequestErrorResponseJsonSchema.definitions.response,
    404: NotFoundErrorResponseJsonSchema.definitions.response,
    401: UnauthenticatedErrorResponseJsonSchema.definitions.response,
    403: UnauthorizedErrorResponseJsonSchema.definitions.response,
  },
}
