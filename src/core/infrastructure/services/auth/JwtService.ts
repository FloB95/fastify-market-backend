import { sign, verify } from 'jsonwebtoken'
import { injectable, singleton } from 'tsyringe'
import { type IJwtService } from '~/core/application/services/IJwtService'
import { env } from '~/core/config/env'

/**
 * Service for managing JSON Web Tokens (JWT).
 * @class
 * @implements IJwtService
 */
@injectable()
@singleton()
export class JwtService implements IJwtService {
  /**
   * Generates a JWT token.
   * @param {string | object} payload - The payload to be encoded in the token.
   * @param {number | string} [expiresIn] - The expiration time of the token.
   * @returns {string} The generated JWT token.
   */
  generateToken(payload: string | object, expiresIn?: number | string): string {
    return sign(payload, env.JWT_SECRET, {
      expiresIn: expiresIn || '1d',
    })
  }

  /**
   * Verifies a JWT token.
   * @param {string} token - The JWT token to be verified.
   * @returns {boolean | string | object} The decoded payload if the token is valid, false otherwise.
   */
  verifyToken(token: string): boolean | string | object {
    try {
      return verify(token, env.JWT_SECRET) as boolean | string | object
    } catch (error) {
      return false
    }
  }
}
