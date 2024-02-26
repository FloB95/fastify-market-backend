import zodToJsonSchema from 'zod-to-json-schema'
import { UpdateUserDtoSchema } from '~/core/domain/dtos/user/IUpdateUserDto'
import { DefaultIdQueryParamSchema } from '~/core/presentation/http/validation/BaseRequestSchema'
import { type ExtendedFastifySchema } from '../../fastify/FastifySwagger'
import { NotFoundErrorResponseJsonSchema } from '../errors/NotFoundErrorSchema'

const DeleteUserJsonSchema = zodToJsonSchema(UpdateUserDtoSchema, {
  $refStrategy: 'none',
  definitions: {
    params: DefaultIdQueryParamSchema,
  },
})

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
