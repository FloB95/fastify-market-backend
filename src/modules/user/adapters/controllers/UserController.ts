import {
  type IHttpRequest,
  type IHttpResponse,
} from '~/core/interfaces/http/Request'
import { makeApiHttpResponse } from '~/core/helpers/httpHelpers'
import { BadRequestError } from '~/core/errors/http'
import { container } from 'tsyringe'
import { UserService } from '../../application/services/UserService'
import { CreateUserDtoSchema } from '../../application/dtos/UserCreateDto'
import {
  type IUserResponseDto,
  UserResponseDtoSchema,
  UserPaginationResponseSchema,
} from '../../application/dtos/UserResponseDto'
import {
  PaginationOptionsSchema,
  type IPaginationResult,
} from '~/core/interfaces/repositories/BaseRepository'
import { ZodError } from 'zod'

export class UserController {
  private userService: UserService

  constructor() {
    this.userService = container.resolve(UserService)
  }

  async createUser(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const userCreateDto = CreateUserDtoSchema.parse(httpRequest.body)
      const user = await this.userService.createUser(userCreateDto)
      const userResponse = UserResponseDtoSchema.parse(user)
      return makeApiHttpResponse(201, userResponse)
    } catch (error: any) {
      const zodErrors = error instanceof ZodError ? error.issues : []
      throw new BadRequestError(error.message, zodErrors)
    }
  }

  async getUsers(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { page, limit } = PaginationOptionsSchema.parse(httpRequest.query)
      const { users, total } = await this.userService.getUsers(page, limit)

      const pagination: IPaginationResult<IUserResponseDto> = {
        page: page,
        limit: limit,
        total: total,
        data: users,
      }

      const response = UserPaginationResponseSchema.parse(pagination)

      return makeApiHttpResponse(200, response)
    } catch (error: any) {
      const zodErrors = error instanceof ZodError ? error.issues : []
      throw new BadRequestError(error.message, zodErrors)
    }
  }
}
