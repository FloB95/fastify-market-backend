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
  UnauthorizedError,
} from '~/core/application/errors/http'
import { ZodError } from 'zod'
import { IGetOneUserByUseCase } from '~/core/application/useCases/user/IGetUserByUseCase'
import { IUpdateUserUseCase } from '~/core/application/useCases/user/IUpdateUserUseCase'
import { ROLES } from '~/core/domain/enums/Roles'
import { UpdateUserDtoSchema } from '~/core/domain/dtos/user/IUpdateUserDto'

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

      // if current logged in user is not the user to update then require admin role or user maintain role
      if (
        httpRequest.user.id !== user.id &&
        !httpRequest.user.roles.includes(ROLES.SUPER_ADMIN) &&
        !httpRequest.user.roles.includes(ROLES['users:maintainer'])
      ) {
        throw new UnauthorizedError(
          'You are not authorized to update this user',
        )
      }

      const updateUserDto = UpdateUserDtoSchema.parse(httpRequest.body)

      // make sure the validated user has the default role APPLICATION_USER
      if (!updateUserDto.roles.includes('APPLICATION_USER')) {
        updateUserDto.roles.push('APPLICATION_USER')
      }

      // remove the SUPER_ADMIN role if the user is not a SUPER_ADMIN
      if (
        updateUserDto.roles.includes('SUPER_ADMIN') &&
        !httpRequest.user.roles.includes('SUPER_ADMIN')
      ) {
        updateUserDto.roles = updateUserDto.roles.filter(
          (role) => role !== 'SUPER_ADMIN',
        )
      }

      const updatedUser = await this.updateUserUseCase.execute(
        user,
        updateUserDto,
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
