import { inject, injectable } from 'tsyringe'
import {
  convertHttpSelectQueryToObj,
  makeApiHttpResponse,
} from '../../helpers/httpHelpers'
import { type IHttpRequest } from '../../interfaces/IRequest'
import { type IHttpResponse } from '../../interfaces/IResponse'
import { type IGetUsersUseCase } from '~/core/application/useCases/user/IGetUsersUseCase'
import qs from 'qs'
import { GetUsersQueryParamsSchema } from '../../validation/user/UsersRequestDtoSchema'
import { type User, UserSchema } from '~/core/domain/entities/User'
import { type IUserResponseDto } from '~/core/domain/dtos/user/IUserResponseDto'
import { UserPaginationResponseSchema } from '~/core/domain/dtos/user/IUserPaginatedResponseDto'
import { type IPaginationDto } from '~/core/domain/dtos/IPaginationDto'
import { type WhereConditions } from '~/core/application/repositories/IBaseRepository'
import { AbstractController } from '../AbstractController'

@injectable()
export class GetUsersController extends AbstractController {
  constructor(
    @inject('GetUsersUseCase')
    private getUsersUseCase: IGetUsersUseCase,
  ) {
    super()
  }

  /**
   * Handles the retrieval of multiple users with pagination and filtering.
   * @param httpRequest The incoming HTTP request.
   * @returns A promise that resolves to an HTTP response.
   */
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
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
      const select = convertHttpSelectQueryToObj(selectString, UserSchema)

      // get users
      const { users, total } = await this.getUsersUseCase.execute({
        limit,
        offset: page,
        select,
        where: where as WhereConditions<User>,
      })

      // create pagination response object
      const pagination: IPaginationDto<IUserResponseDto> = {
        page: page,
        limit: limit,
        total,
        data: users,
      }

      // validate and return response
      const response = UserPaginationResponseSchema.parse(pagination)

      return makeApiHttpResponse(200, response)
    } catch (error: any) {
      this.handleError(error)
    }
  }
}
