import { inject, injectable } from 'tsyringe'
import { makeApiHttpResponse } from '../../helpers/httpHelpers'
import { type IController } from '../../interfaces/IController'
import { type IHttpRequest } from '../../interfaces/IRequest'
import { type IHttpResponse } from '../../interfaces/IResponse'
import {
  BadRequestError,
  UnauthenticatedError,
} from '~/core/application/errors/http'
import { ZodError } from 'zod'
import { IRefreshAuthTokenUseCase } from '~/core/application/useCases/auth/IRefreshAuthTokenUseCase'
import { SignInResponseSchema } from '~/core/domain/dtos/auth/ISignInResponseDto'
import { IJwtService } from '~/core/application/services/IJwtService'

/**
 * Controller for handling refresh access token requests.
 * @class
 * @implements IController
 */
@injectable()
export class RefreshAccessTokenController implements IController {
  /**
   * Creates an instance of RefreshAccessTokenController.
   * @param {IRefreshAuthTokenUseCase} refreshAuthTokenUseCase - The use case for refreshing an authentication token.
   * @param {IJwtService} jwtService - The JWT service.
   */
  constructor(
    @inject('RefreshAuthTokenUseCase')
    private refreshAuthTokenUseCase: IRefreshAuthTokenUseCase,
    @inject('JwtService') private jwtService: IJwtService,
  ) {}

  /**
   * Handles the refresh access token request.
   * @param {IHttpRequest} httpRequest - The HTTP request.
   * @returns {Promise<IHttpResponse>} A promise that resolves to the HTTP response.
   */
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { refreshToken } = SignInResponseSchema.pick({
        refreshToken: true,
      }).parse(httpRequest.body)

      const decodedRefreshToken = this.jwtService.verifyToken(refreshToken) as {
        id: string
      }

      const newToken = await this.refreshAuthTokenUseCase.execute(
        decodedRefreshToken?.id,
      )

      return makeApiHttpResponse(200, {
        accessToken: newToken,
      })
    } catch (error: any) {
      // pass error if already api error
      if (error instanceof ZodError) {
        throw new BadRequestError(error.message, error.issues)
      }

      throw new UnauthenticatedError(error.message)
    }
  }
}
