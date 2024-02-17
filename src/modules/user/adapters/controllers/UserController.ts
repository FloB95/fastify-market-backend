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
} from '../../application/dtos/UserResponseDto'
import {
  PaginationOptionsSchema,
  type IPaginationResult,
} from '~/core/interfaces/repositories/BaseRepository'

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
      throw new BadRequestError(error.message)
    }
  }

  async getUsers(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { page, limit } = PaginationOptionsSchema.parse(httpRequest.query)
    const users = await this.userService.getUsers(page, limit)

    const pagination: IPaginationResult<IUserResponseDto> = {
      page: page,
      limit: limit,
      total: users.length,
      data: users.map((user) => UserResponseDtoSchema.parse(user)),
    }

    return makeApiHttpResponse(200, pagination)
  }
}
