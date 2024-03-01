import { type RefreshToken } from "~/core/domain/entities/RefreshToken";


export interface ICreateRefreshTokenUseCase {
  /**
   * Executes the create refresh token use case.
   *
   * @async
   * @param {string} userId - The user identifier.
   * @returns {Promise<RefreshToken>} The response data.
   *
   * @remarks
   * This method is responsible for handling the logic of creating a refresh token
   * for the user with the provided identifier.
   */
  execute(userId: string): Promise<RefreshToken>
}
