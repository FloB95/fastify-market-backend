import { type ISignInCredentialsDto } from '~/core/domain/dtos/auth/ISignInCredentialsDto'
import { type IBaseUseCase } from '../IBaseUseCase'
import { type ISignInResponseDto } from '~/core/domain/dtos/auth/ISignInResponseDto'

/**
 * Interface for the use case of authenticating a user.
 *
 * This interface defines the contract for a use case responsible for authenticating
 * a user based on the provided credentials.
 *
 * @interface
 */
export interface IAuthenticateUserUseCase extends IBaseUseCase {
  /**
   * Executes the authenticate user use case.
   *
   * @async
   * @param {ISignInCredentialsDto} credentials - The user credentials for authentication.
   * @returns {Promise<ISignInResponseDto>} The response data.
   *
   * @remarks
   * This method is responsible for handling the logic of authenticating a user
   * based on the provided credentials (email and password).
   */
  execute({
    email,
    password,
  }: ISignInCredentialsDto): Promise<ISignInResponseDto>
}
