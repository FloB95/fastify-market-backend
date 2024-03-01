import zodToJsonSchema from 'zod-to-json-schema'
import { BadRequestErrorResponseJsonSchema } from '../errors/BadRequestSchema'
import { type IExtendedFastifySchema } from '../../fastify/interfaces/Defaults'
import { SignInCredentialsSchema } from '~/core/domain/dtos/auth/ISignInCredentialsDto'
import { UnauthenticatedErrorResponseJsonSchema } from '../errors/UnauthenticatedErrorSchema'
import { SignInResponseSchema } from '~/core/domain/dtos/auth/ISignInResponseDto'

/**
 * JSON schema for the sign-in credentials.
 * @type {object}
 */
const UserSignInSchemaJsonSchema = zodToJsonSchema(SignInCredentialsSchema, {
  $refStrategy: 'none',
  definitions: {
    body: SignInCredentialsSchema,
    response: SignInResponseSchema,
  },
})

export const UserSignInSchema: IExtendedFastifySchema = {
  description: 'Sign in a user.',
  tags: ['Auth'],
  body: UserSignInSchemaJsonSchema.definitions.body,
  response: {
    201: UserSignInSchemaJsonSchema.definitions.response,
    400: BadRequestErrorResponseJsonSchema.definitions.response,
    401: UnauthenticatedErrorResponseJsonSchema.definitions.response,
  },
}
