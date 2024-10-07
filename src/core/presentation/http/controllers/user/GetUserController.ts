import { inject, injectable } from 'tsyringe'
import { makeApiHttpResponse } from '../../helpers/httpHelpers'
import { type IHttpRequest } from '../../interfaces/IRequest'
import { type IHttpResponse } from '../../interfaces/IResponse'
import { UserResponseDtoSchema } from '~/core/domain/dtos/user/IUserResponseDto'
import { NotFoundError } from '~/core/application/errors/http'
import { type IGetOneUserByUseCase } from '~/core/application/useCases/user/IGetUserByUseCase'
import { AbstractController } from '../AbstractController'

@injectable()
export class GetUserController extends AbstractController {
  constructor(
    @inject('GetOneUserByUseCase')
    private getOneUserByUseCase: IGetOneUserByUseCase,
  ) {
    super()
  }

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
      this.handleError(error)
    }
  }
}
