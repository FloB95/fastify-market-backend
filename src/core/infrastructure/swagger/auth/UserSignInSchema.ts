import zodToJsonSchema from 'zod-to-json-schema'
import { UserResponseDtoSchema } from '~/core/domain/dtos/user/IUserResponseDto'
import { BadRequestErrorResponseJsonSchema } from '../errors/BadRequestSchema'
import { type IExtendedFastifySchema } from '../../fastify/interfaces/Defaults'
import { SignInCredentialsSchema } from '~/core/domain/dtos/auth/ISignInCredentialsDto'
import { UnauthenticatedErrorResponseJsonSchema } from '../errors/UnauthenticatedErrorSchema'

/**
 * JSON schema for the sign-in credentials.
 * @type {object}
 */
const UserSignInSchemaJsonSchema = zodToJsonSchema(SignInCredentialsSchema, {
  $refStrategy: 'none',
  definitions: {
    body: SignInCredentialsSchema,
    response: UserResponseDtoSchema,
  },
})

/**
 * Schema for creating a user.
 * @type {IExtendedFastifySchema}
 */
export const CreateUserSchema: IExtendedFastifySchema = {
  /**
   * Description of the schema.
   * @type {string}
   */
  description: 'Sign in a user.',

  /**
   * Tags associated with the schema.
   * @type {readonly string[]}
   */
  tags: ['Auth'],

  /**
   * Body schema for the request.
   * @type {object}
   */
  body: UserSignInSchemaJsonSchema.definitions.body,

  /**
   * Response schema for the request.
   * @type {object}
   */
  response: {
    201: UserSignInSchemaJsonSchema.definitions.response,
    400: BadRequestErrorResponseJsonSchema.definitions.response,
    401: UnauthenticatedErrorResponseJsonSchema.definitions.response,
  },
}
