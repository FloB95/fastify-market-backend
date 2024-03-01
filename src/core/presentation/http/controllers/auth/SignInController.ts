import { inject, injectable } from 'tsyringe'
import { makeApiHttpResponse } from '../../helpers/httpHelpers'
import { type IController } from '../../interfaces/IController'
import { type IHttpRequest } from '../../interfaces/IRequest'
import { type IHttpResponse } from '../../interfaces/IResponse'
import {
  BadRequestError,
  UnauthenticatedError,
} from '~/core/application/errors/http'
import { IAuthenticateUserUseCase } from '~/core/application/useCases/auth/IAuthenticateUserUseCase'
import { SignInCredentialsSchema } from '~/core/domain/dtos/auth/ISignInCredentialsDto'
import { ZodError } from 'zod'

/**
 * Controller for handling user sign-in requests.
 * @class
 * @implements IController
 */
@injectable()
export class SignInController implements IController {
  /**
   * Creates an instance of SignInController.
   * @param {IAuthenticateUserUseCase} authenticateUserUseCase - The use case for authenticating a user.
   */
  constructor(
    @inject('AuthenticateUserUseCase')
    private authenticateUserUseCase: IAuthenticateUserUseCase,
  ) {}

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
      // pass error if already api error
      if (error instanceof ZodError) {
        throw new BadRequestError(error.message, error.issues)
      }

      throw new UnauthenticatedError(error.message)
    }
  }
}
