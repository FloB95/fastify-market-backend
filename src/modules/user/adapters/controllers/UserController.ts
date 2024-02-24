import {
  type IHttpRequest,
  type IHttpResponse,
} from '~/core/domain/http/Request'
import {
  convertQuerySelectToObj,
  makeApiHttpResponse,
} from '~/core/helpers/httpHelpers'
import {
  BadRequestError,
  CustomApiError,
  NotFoundError,
} from '~/core/errors/http'
import { container } from 'tsyringe'
import { UserService } from '../../application/services/UserService'
import { CreateUserDtoSchema } from '../../application/dtos/UserCreateDto'
import {
  type IUserResponseDto,
  UserResponseDtoSchema,
  UserPaginationResponseSchema,
} from '../../application/dtos/UserResponseDto'
import { ZodError } from 'zod'
import { UserSchema } from '../../domain/entities/User'
import { GetUsersQueryParamsSchema } from '../../application/dtos/UsersRequestDto'
import qs from 'qs'
import { type IPaginationResult } from '~/core/domain/dto/BaseResponseDto'

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
      const {
        page: qPage,
        limit: qLimit,
        select: qSelect,
        where: qWhere,
      } = httpRequest.query

      // parsed where query string
      const pWhere: any = qWhere ? qs.parse(qWhere) : undefined

      // validated query params
      const {
        page,
        limit,
        select: selectString,
        where,
      } = GetUsersQueryParamsSchema.parse({
        page: qPage,
        limit: qLimit,
        select: qSelect,
        where: pWhere,
      })

      // convert select string to object
      const select = convertQuerySelectToObj(selectString, UserSchema)

      // get users
      const { users, total } = await this.userService.getUsers(
        page,
        limit,
        select,
        where,
      )

      // create pagination response object
      const pagination: IPaginationResult<IUserResponseDto> = {
        page: page,
        limit: limit,
        total,
        data: users,
      }

      // validate and return response
      const response = UserPaginationResponseSchema.parse(pagination)

      return makeApiHttpResponse(200, response)
    } catch (error: any) {
      const zodErrors = error instanceof ZodError ? error.issues : []
      throw new BadRequestError(error.message, zodErrors)
    }
  }

  async getUser(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { id } = httpRequest.params

      const user = await this.userService.getUserById(id)

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

  async updateUser(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { id } = httpRequest.params
      const user = await this.userService.getUserById(id)

      if (!user) {
        throw new NotFoundError('User not found')
      }

      const updatedUser = await this.userService.updateUser(
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

  async deleteUser(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { id } = httpRequest.params
      const user = await this.userService.getUserById(id)

      if (!user) {
        throw new NotFoundError('User not found')
      }

      await this.userService.deleteUser(user)

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
