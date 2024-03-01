import { type FastifySchema } from 'fastify'
import { type IUserResponseDto } from '~/core/domain/dtos/user/IUserResponseDto'

declare module 'fastify' {
  interface FastifyRequest {
    user: IUserResponseDto
  }
}

/**
 * Extends the Fastify schema with additional properties.
 * @interface
 * @extends FastifySchema
 */
export interface IExtendedFastifySchema extends FastifySchema {
  /**
   * Indicates whether to hide the schema.
   * @type {boolean}
   */
  hide?: boolean

  /**
   * Indicates whether to validate the schema.
   * @type {boolean}
   */
  validate?: boolean

  /**
   * Indicates whether the schema is deprecated.
   * @type {boolean}
   */
  deprecated?: boolean

  /**
   * Tags associated with the schema.
   * @type {readonly string[]}
   */
  tags?: readonly string[]

  /**
   * Description of the schema.
   * @type {string}
   */
  description?: string

  /**
   * Summary of the schema.
   * @type {string}
   */
  summary?: string

  /**
   * Consumes media types.
   * @type {readonly string[]}
   */
  consumes?: readonly string[]

  /**
   * Produces media types.
   * @type {readonly string[]}
   */
  produces?: readonly string[]

  /**
   * Security requirements for the schema.
   * @type {ReadonlyArray<{ [securityLabel: string]: readonly string[] }>}
   */
  security?: ReadonlyArray<{ [securityLabel: string]: readonly string[] }>
}
