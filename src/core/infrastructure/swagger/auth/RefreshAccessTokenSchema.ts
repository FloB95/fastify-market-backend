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
const RefreshAccessTokenSchemaJsonSchema = zodToJsonSchema(
  SignInCredentialsSchema,
  {
    $refStrategy: 'none',
    definitions: {
      body: SignInResponseSchema.pick({ refreshToken: true }),
      response: SignInResponseSchema.pick({ accessToken: true }),
    },
  },
)

export const RefreshAccessTokenSchema: IExtendedFastifySchema = {
  description: 'Refresh the access token via refresh token.',
  tags: ['Auth'],
  body: RefreshAccessTokenSchemaJsonSchema.definitions.body,
  response: {
    200: RefreshAccessTokenSchemaJsonSchema.definitions.response,
    400: BadRequestErrorResponseJsonSchema.definitions.response,
    401: UnauthenticatedErrorResponseJsonSchema.definitions.response,
  },
}
