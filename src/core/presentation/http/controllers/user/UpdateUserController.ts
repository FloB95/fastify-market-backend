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
import { IGetOneUserByUseCase } from '~/core/application/useCases/user/IGetUserByUseCase'
import { IUpdateUserUseCase } from '~/core/application/useCases/user/IUpdateUserUseCase'

@injectable()
export class UpdateUserController implements IController {
  constructor(
    @inject('UpdateUserUseCase') private updateUserUseCase: IUpdateUserUseCase,
    @inject('GetOneUserByUseCase')
    private getOneUserByUseCase: IGetOneUserByUseCase,
  ) {}

  /**
   * Handles the update of a user.
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

      const updatedUser = await this.updateUserUseCase.execute(
        user,
        httpRequest.body,
      )

      const userResponse = UserResponseDtoSchema.parse(updatedUser)
      return makeApiHttpResponse(200, userResponse)
    } catch (error: any) {
      // pass error if already api error
      if (error instanceof CustomApiError) {
        throw error
      }

      const zodErrors = error instanceof ZodError ? error.issues : []
      throw new BadRequestError(error.message, zodErrors)
    }
  }
}
