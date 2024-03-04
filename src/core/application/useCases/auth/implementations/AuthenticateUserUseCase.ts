import { IUserRepository } from '~/core/application/repositories/IUserRepository'
import { type IAuthenticateUserUseCase } from '../IAuthenticateUserUseCase'
import { inject, injectable } from 'tsyringe'
import { UnauthenticatedError } from '~/core/application/errors/http'
import { IPasswordService } from '~/core/application/services/IPasswordService'
import { IJwtService } from '~/core/application/services/IJwtService'
import { type ISignInCredentialsDto } from '~/core/domain/dtos/auth/ISignInCredentialsDto'
import { UserResponseDtoSchema } from '~/core/domain/dtos/user/IUserResponseDto'
import { ICreateRefreshTokenUseCase } from '../ICreateRefreshTokenUseCase'
import { type ISignInResponseDto } from '~/core/domain/dtos/auth/ISignInResponseDto'
import { IEventEmitter } from '~/core/domain/events/IEventEmitter'
import { UserLoggedInEvent } from '~/core/domain/events/user/UserLoggedInEvent'

/**
 * Use case for authenticating a user.
 *
 * @class
 * @implements {IAuthenticateUserUserUseCase}
 */
@injectable()
export class AuthenticateUserUseCase implements IAuthenticateUserUseCase {
  /**
   * Creates an instance of AuthenticateUserUseCase.
   * @param {IUserRepository} userRepository - The user repository.
   * @param {IPasswordService} passwordService - The password service.
   * @param {IJwtService} jwtService - The JWT service.
   * @param {ICreateRefreshTokenUseCase} createRefreshTokenUseCase - The create refresh token use case.
   */
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('PasswordService') private passwordService: IPasswordService,
    @inject('JwtService') private jwtService: IJwtService,
    @inject('CreateRefreshTokenUseCase')
    private createRefreshTokenUseCase: ICreateRefreshTokenUseCase,
    @inject('EventEmitter') private eventEmitter: IEventEmitter,
  ) {}

  /**
   * Executes the authentication process.
   * @param {ISignInCredentialsDto} credentials - The sign-in credentials.
   * @returns {Promise<ISignInResponseDto>} A promise that resolves to the sign-in response DTO.
   */
  async execute({
    email,
    password,
  }: ISignInCredentialsDto): Promise<ISignInResponseDto> {
    const user = await this.userRepository.findOneByEmail(email)

    if (!user) {
      throw new UnauthenticatedError('Email or password wrong')
    }

    const passwordMatch = await this.passwordService.comparePasswords(
      password,
      user.password,
    )

    if (!passwordMatch) {
      throw new UnauthenticatedError('Email or password wrong')
    }

    const userDto = UserResponseDtoSchema.parse(user)
    const accessToken = this.jwtService.generateToken(userDto, '30d') // TODO change to 5m

    // create refresh token with use case
    const refreshToken = await this.createRefreshTokenUseCase.execute(user.id)

    // generate token for refresh token
    const refreshTokenToken = this.jwtService.generateToken(
      { id: refreshToken.id },
      '30d', // TODO store lifetime in config
    )

    // emit events
    const userLoggedInEvent = new UserLoggedInEvent(user)
    this.eventEmitter.emit(userLoggedInEvent)

    return { accessToken, refreshToken: refreshTokenToken }
  }
}
