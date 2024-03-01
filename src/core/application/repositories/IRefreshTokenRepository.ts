import type IBaseRepository from './IBaseRepository'
import { type RefreshToken } from '~/core/domain/entities/RefreshToken'

/**
 * Interface for the RefreshTokenRepository.
 * @interface
 * @extends IBaseRepository<RefreshToken>
 */
export interface IRefreshTokenRepository extends IBaseRepository<RefreshToken> {
  /**
   * Finds a refresh token by user ID.
   * @param {string} id - The user ID to search for.
   * @returns {Promise<RefreshToken | undefined>} A promise that resolves to the found refresh token or undefined if not found.
   */
  findOneByUserId(id: string): Promise<RefreshToken | undefined>
}
