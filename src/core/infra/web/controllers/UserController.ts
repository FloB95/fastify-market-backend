import {
  type IHttpRequest,
  type IHttpResponse,
} from '~/core/interfaces/web/Request'
import { BadRequestError } from '../errors'
import { type UserService } from '~/core/application/services/UserService'
import { makeApiHttpResponse } from '../helpers/httpHelpers'

export class UserController {
  constructor(private readonly userService: UserService) {}

  async createUser(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      console.log(httpRequest.body)
      await this.userService.create()
      return makeApiHttpResponse(201, {
        message: 'Hello World',
      })
    } catch (error: any) {
      throw new BadRequestError(error.message)
    }
  }
}
