/**
 * Interface for the use case of refreshing a user's authentication token.
 *
 * This interface defines the contract for a use case responsible for refreshing
 * a user's authentication token using a provided refresh token identifier.
 *
 * @interface
 */
export interface IRefreshAuthTokenUseCase {
  /**
   * Executes the refresh token user use case.
   *
   * @async
   * @param {string} refreshTokenId - The refresh token information.
   * @returns {Promise<string>} The response data.
   *
   * @remarks
   * This method is responsible for handling the logic of refreshing a user's
   * authentication token based on the provided refresh token identifier.
   */
  execute(refreshTokenId: string): Promise<string>
}
