import { inject, injectable } from 'tsyringe'
import { makeApiHttpResponse } from '../../helpers/httpHelpers'
import { type IHttpRequest } from '../../interfaces/IRequest'
import { type IHttpResponse } from '../../interfaces/IResponse'
import { type IAuthenticateUserUseCase } from '~/core/application/useCases/auth/IAuthenticateUserUseCase'
import { SignInCredentialsSchema } from '~/core/domain/dtos/auth/ISignInCredentialsDto'
import { AbstractController } from '../AbstractController'

/**
 * Controller for handling user sign-in requests.
 * @class
 */
@injectable()
export class SignInController extends AbstractController {
  /**
   * Creates an instance of SignInController.
   * @param {IAuthenticateUserUseCase} authenticateUserUseCase - The use case for authenticating a user.
   */
  constructor(
    @inject('AuthenticateUserUseCase')
    private authenticateUserUseCase: IAuthenticateUserUseCase,
  ) {
    super()
  }

  /**
   * Handles the user sign-in request.
   * @param {IHttpRequest} httpRequest - The HTTP request.
   * @returns {Promise<IHttpResponse>} A promise that resolves to the HTTP response.
   */
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const credentialsDto = SignInCredentialsSchema.parse(httpRequest.body)
      const authResponse =
        await this.authenticateUserUseCase.execute(credentialsDto)

      return makeApiHttpResponse(200, authResponse)
    } catch (error: any) {
      this.handleError(error)
    }
  }
}
