/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject, injectable } from 'tsyringe'
import { type IRefreshAuthTokenUseCase } from '../IRefreshAuthTokenUseCase'
import { IUserRepository } from '~/core/application/repositories/IUserRepository'
import { IRefreshTokenRepository } from '~/core/application/repositories/IRefreshTokenRepository'
import { UnauthenticatedError } from '~/core/application/errors/http'
import { UserResponseDtoSchema } from '~/core/domain/dtos/user/IUserResponseDto'
import { IJwtService } from '~/core/application/services/IJwtService'

/**
 * Use case for refreshing an authentication token.
 *
 * @class
 * @implements {IRefreshAuthTokenUseCase}
 */
@injectable()
export class RefreshAuthTokenUseCase implements IRefreshAuthTokenUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('RefreshTokenRepository')
    private refreshTokenRepository: IRefreshTokenRepository,
    @inject('JwtService') private jwtService: IJwtService,
  ) {}

  /**
   * Refreshes an authentication token.
   * @param {string} refreshTokenId - The ID of the refresh token to use for refreshing the authentication token.
   * @returns {Promise<string>} A promise that resolves to the refreshed authentication token.
   */
  async execute(refreshTokenId: string): Promise<string> {
    const refreshToken =
      await this.refreshTokenRepository.findOneById(refreshTokenId)

    // if not found
    if (!refreshToken) {
      throw new UnauthenticatedError('Invalid refresh token')
    }

    // if is expired
    if (refreshToken.isExpired()) {
      // delete the refresh token
      await this.refreshTokenRepository.delete(refreshToken)
      throw new UnauthenticatedError('Refresh token expired')
    }

    // get the user
    const user = await this.userRepository.findOneById(refreshToken.userId)

    // if no user found
    if (!user) {
      throw new UnauthenticatedError('Invalid refresh token')
    }

    // generate a new access token
    const userDto = UserResponseDtoSchema.parse(user)
    const accessToken = this.jwtService.generateToken(userDto, '1h')

    return accessToken
  }
}
