import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '~/core/application/repositories/IUserRepository'
import { type ICreateRefreshTokenUseCase } from '../ICreateRefreshTokenUseCase'
import { NotFoundError } from '~/core/application/errors/http'
import { RefreshToken } from '~/core/domain/entities/RefreshToken'
import { IRefreshTokenRepository } from '~/core/application/repositories/IRefreshTokenRepository'

/**
 * Use case for creating a refresh token.
 *
 * @class
 * @implements {ICreateRefreshTokenUseCase}
 */
@injectable()
export class CreateRefreshTokenUseCase implements ICreateRefreshTokenUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('RefreshTokenRepository')
    private refreshTokenRepository: IRefreshTokenRepository,
  ) {}

  /**
   * Creates a refresh token for the specified user.
   * @param {string} userId - The ID of the user for whom to create the refresh token.
   * @returns {Promise<RefreshToken>} A promise that resolves to the created refresh token.
   */
  async execute(userId: string): Promise<RefreshToken> {
    const user = await this.userRepository.findOneById(userId)

    // if user not found, throw error
    if (!user) {
      throw new NotFoundError('User not found')
    }

    // if user has a refresh token, delete it
    const refreshTokenFounded =
      await this.refreshTokenRepository.findOneByUserId(user.id)

    if (refreshTokenFounded) {
      await this.refreshTokenRepository.delete(refreshTokenFounded)
    }

    // create refresh token (30 Days from now)
    const refreshTokenExpiration = new Date(
      new Date().getTime() + 30 * 24 * 60 * 60 * 1000,
    )

    // create a new refresh token entity
    const newRefreshToken = new RefreshToken(
      await this.refreshTokenRepository.generateId(),
      refreshTokenExpiration,
      user.id,
    )

    // create the refresh token
    await this.refreshTokenRepository.create(newRefreshToken)

    // get the created refresh token from the repository
    const createdRefreshToken = await this.refreshTokenRepository.findOneById(
      newRefreshToken.id,
    )

    return createdRefreshToken
  }
}
