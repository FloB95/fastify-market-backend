import { inject, injectable } from 'tsyringe'
import { makeApiHttpResponse } from '../../helpers/httpHelpers'
import { type IHttpRequest } from '../../interfaces/IRequest'
import { type IHttpResponse } from '../../interfaces/IResponse'
import { UserResponseDtoSchema } from '~/core/domain/dtos/user/IUserResponseDto'
import {
  NotFoundError,
  UnauthorizedError,
} from '~/core/application/errors/http'
import { type IGetOneUserByUseCase } from '~/core/application/useCases/user/IGetUserByUseCase'
import { type IUpdateUserUseCase } from '~/core/application/useCases/user/IUpdateUserUseCase'
import { ROLES } from '~/core/domain/enums/Roles'
import { UpdateUserDtoSchema } from '~/core/domain/dtos/user/IUpdateUserDto'
import { AbstractController } from '../AbstractController'

@injectable()
export class UpdateUserController extends AbstractController {
  constructor(
    @inject('UpdateUserUseCase') private updateUserUseCase: IUpdateUserUseCase,
    @inject('GetOneUserByUseCase')
    private getOneUserByUseCase: IGetOneUserByUseCase,
  ) {
    super()
  }

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

      // if current logged in user is not the user to update then require admin role or user maintain role
      if (
        httpRequest.user.id !== user.id &&
        !httpRequest.user.roles.includes(ROLES.SUPER_ADMIN) &&
        !httpRequest.user.roles.includes(ROLES['users:maintainer']) &&
        !httpRequest.user.roles.includes(ROLES['users:update'])
      ) {
        throw new UnauthorizedError(
          'You are not authorized to update this user',
        )
      }

      // validate the incoming user data
      const updateUserDto = UpdateUserDtoSchema.parse(httpRequest.body)

      // make sure the validated user has the default role APPLICATION_USER
      if (!updateUserDto?.roles?.includes('APPLICATION_USER')) {
        updateUserDto?.roles?.push('APPLICATION_USER')
      }

      // remove the SUPER_ADMIN role if the user is not a SUPER_ADMIN
      if (
        updateUserDto.roles &&
        updateUserDto.roles.includes('SUPER_ADMIN') &&
        !httpRequest.user.roles.includes('SUPER_ADMIN')
      ) {
        updateUserDto.roles = updateUserDto.roles.filter(
          (role) => role !== 'SUPER_ADMIN',
        )
      }

      // remove the roles if the user is not a SUPER_ADMIN or users:maintainer
      if (
        !httpRequest.user.roles.includes(ROLES.SUPER_ADMIN) &&
        !httpRequest.user.roles.includes(ROLES['users:maintainer'])
      ) {
        delete updateUserDto.roles
      }

      // update the user
      const updatedUser = await this.updateUserUseCase.execute(
        user,
        updateUserDto,
      )

      const userResponse = UserResponseDtoSchema.parse(updatedUser)
      return makeApiHttpResponse(200, userResponse)
    } catch (error: any) {
      this.handleError(error)
    }
  }
}
