import { inject, injectable } from 'tsyringe'
import { makeApiHttpResponse } from '../../helpers/httpHelpers'
import { type IHttpRequest } from '../../interfaces/IRequest'
import { type IHttpResponse } from '../../interfaces/IResponse'
import {
  NotFoundError
} from '~/core/application/errors/http'
import { type IDeleteUserUseCase } from '~/core/application/useCases/user/IDeleteUserUseCase'
import { type IGetOneUserByUseCase } from '~/core/application/useCases/user/IGetUserByUseCase'
import { AbstractController } from '../AbstractController'

@injectable()
export class DeleteUserController extends AbstractController{
  constructor(
    @inject('DeleteUserUseCase') private deleteUserUseCase: IDeleteUserUseCase,
    @inject('GetOneUserByUseCase')
    private getOneUserByUseCase: IGetOneUserByUseCase,
  ) {
    super()
  }

  /**
   * Handles the deletion of a user.
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

      await this.deleteUserUseCase.execute(user, httpRequest.user)

      return makeApiHttpResponse(200, true)
    } catch (error: any) {
      this.handleError(error)
    }
  }
}
