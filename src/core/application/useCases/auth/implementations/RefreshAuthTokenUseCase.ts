/* eslint-disable @typescript-eslint/no-unused-vars */
import { injectable } from 'tsyringe'
import { type IRefreshAuthTokenUseCase } from '../IRefreshAuthTokenUseCase'

/**
 * Use case for refreshing an authentication token.
 *
 * @class
 * @implements {IRefreshAuthTokenUseCase}
 */
@injectable()
export class RefreshAuthTokenUseCase implements IRefreshAuthTokenUseCase {
  /**
   * Refreshes an authentication token.
   * @param {string} refreshTokenId - The ID of the refresh token to use for refreshing the authentication token.
   * @returns {Promise<string>} A promise that resolves to the refreshed authentication token.
   */
  execute(refreshTokenId: string): Promise<string> {
    throw new Error('Method not implemented.')
  }
}
