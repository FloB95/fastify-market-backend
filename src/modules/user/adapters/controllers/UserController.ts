import {
  type IHttpRequest,
  type IHttpResponse,
} from '~/core/interfaces/http/Request'
import { makeApiHttpResponse } from '~/core/helpers/httpHelpers'
import { BadRequestError } from '~/core/errors/http'
import { container } from 'tsyringe'
import { UserService } from '../../application/services/UserService'
import { User } from '../../domain/entities/User'

export class UserController {
  private userService: UserService

  constructor() {
    this.userService = container.resolve(UserService)
  }

  async createUser(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      console.log(httpRequest.body)
      let user = new User('123', 'tes†@test.dev', 'password')
      user = await this.userService.createUser(user)
      return makeApiHttpResponse(201, user)
    } catch (error: any) {
      throw new BadRequestError(error.message)
    }
  }
}
