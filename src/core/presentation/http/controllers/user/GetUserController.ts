import { inject, injectable } from 'tsyringe'
import { makeApiHttpResponse } from '../../helpers/httpHelpers'
import { type IController } from '../../interfaces/IController'
import { type IHttpRequest } from '../../interfaces/IRequest'
import { type IHttpResponse } from '../../interfaces/IResponse'
import { UserResponseDtoSchema } from '~/core/domain/dtos/user/IUserResponseDto'
import {
  BadRequestError,
  CustomApiError,
  NotFoundError,
} from '~/core/application/errors/http'
import { ZodError } from 'zod'
import { type IGetOneUserByUseCase } from '~/core/application/useCases/user/IGetUserByUseCase'

@injectable()
export class GetUserController implements IController {
  constructor(
    @inject('GetOneUserByUseCase')
    private getOneUserByUseCase: IGetOneUserByUseCase,
  ) {}

  /**
   * Handles the retrieval of a user by ID.
   * @param httpRequest The incoming HTTP request.
   * @returns A promise that resolves to an HTTP response.
   */
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { id } = httpRequest.params

      const user = await this.getOneUserByUseCase.execute({ id })

      if (!user) {
        throw new NotFoundError('User not found')
      }

      const response = UserResponseDtoSchema.parse(user)

      return makeApiHttpResponse(200, response)
    } catch (error: any) {
      // pass error if already api error
      if (error instanceof CustomApiError) {
        throw error
      }

      // handle other errors
      const zodErrors = error instanceof ZodError ? error.issues : []
      throw new BadRequestError(error.message, zodErrors)
    }
  }
}
