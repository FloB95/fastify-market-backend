import { inject, injectable } from 'tsyringe'
import { makeApiHttpResponse } from '../../helpers/httpHelpers'
import { type IController } from '../../interfaces/IController'
import { type IHttpRequest } from '../../interfaces/IRequest'
import { type IHttpResponse } from '../../interfaces/IResponse'
import {
  BadRequestError,
  CustomApiError,
  NotFoundError,
} from '~/core/application/errors/http'
import { ZodError } from 'zod'
import { IDeleteUserUseCase } from '~/core/application/useCases/user/IDeleteUserUseCase'
import { IGetOneUserByUseCase } from '~/core/application/useCases/user/IGetUserByUseCase'

@injectable()
export class DeleteUserController implements IController {
  constructor(
    @inject('DeleteUserUseCase') private deleteUserUseCase: IDeleteUserUseCase,
    @inject('GetOneUserByUseCase')
    private getOneUserByUseCase: IGetOneUserByUseCase,
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { id } = httpRequest.params
      const user = await this.getOneUserByUseCase.execute({ id })

      if (!user) {
        throw new NotFoundError('User not found')
      }

      await this.deleteUserUseCase.execute(user)

      return makeApiHttpResponse(200, true)
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
