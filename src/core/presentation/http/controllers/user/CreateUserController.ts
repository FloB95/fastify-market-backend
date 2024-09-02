import { inject, injectable } from 'tsyringe'
import { makeApiHttpResponse } from '../../helpers/httpHelpers'
import { type IController } from '../../interfaces/IController'
import { type IHttpRequest } from '../../interfaces/IRequest'
import { type IHttpResponse } from '../../interfaces/IResponse'
import { CreateUserDtoSchema } from '~/core/domain/dtos/user/ICreateUserDto'
import { type ICreateUserUseCase } from '~/core/application/useCases/user/ICreateUserUseCase'
import { UserResponseDtoSchema } from '~/core/domain/dtos/user/IUserResponseDto'
import { BadRequestError } from '~/core/application/errors/http'
import { ZodError } from 'zod'

@injectable()
export class CreateUserController implements IController {
  constructor(
    @inject('CreateUserUseCase') private createUserUseCase: ICreateUserUseCase,
  ) {}

  /**
   * Handles the creation of a new user.
   * @param httpRequest The incoming HTTP request.
   * @returns A promise that resolves to an HTTP response.
   */
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      // validate the incoming user data
      const userCreateDto = CreateUserDtoSchema.parse(httpRequest.body)

      // make sure the validated user has the default role APPLICATION_USER
      if (!userCreateDto?.roles?.includes('APPLICATION_USER')) {
        userCreateDto?.roles?.push('APPLICATION_USER')
      }

      // remove the SUPER_ADMIN role if the user is not a SUPER_ADMIN
      if (
        userCreateDto.roles &&
        userCreateDto.roles.includes('SUPER_ADMIN') &&
        !httpRequest.user.roles.includes('SUPER_ADMIN')
      ) {
        userCreateDto.roles = userCreateDto.roles.filter(
          (role) => role !== 'SUPER_ADMIN',
        )
      }

      const user = await this.createUserUseCase.execute(userCreateDto)
      const userResponse = UserResponseDtoSchema.parse(user)
      return makeApiHttpResponse(201, userResponse)
    } catch (error: any) {
      const zodErrors = error instanceof ZodError ? error.issues : []
      throw new BadRequestError(error.message, zodErrors)
    }
  }
}
