import { z } from 'zod'
import { BaseEntity, BaseEntitySchema } from './BaseEntity'

/**
 * The RefreshToken schema.
 */
export const RefreshTokenSchema = z.object({
  ...BaseEntitySchema.shape,
  expiresAt: z.date(),
  userId: z.string(),
})

/**
 * Represents a refresh token entity.
 */
export class RefreshToken extends BaseEntity {
  /**
   * Creates an instance of RefreshToken.
   * @param {string} id The unique identifier of the refresh token.
   * @param {Date} expiresAt The expiration date of the refresh token.
   * @param {string} userId The unique identifier of the user associated with the refresh token.
   */
  constructor(
    public readonly id: string,
    public expiresAt: Date,
    public userId: string,
  ) {
    super(id)
  }

  /**
   * Checks whether the refresh token is expired.
   * @returns {boolean} `true` if the refresh token is expired, otherwise `false`.
   */
  isExpired(): boolean {
    return this.expiresAt.getTime() < Date.now()
  }
}
