import { ZodError } from 'zod'
import { BadRequestError, CustomApiError } from '~/core/application/errors/http'
import { type IController } from '../interfaces/IController'
import { type IHttpRequest } from '../interfaces/IRequest'
import { type IHttpResponse } from '../interfaces/IResponse'

export abstract class AbstractController implements IController {
  handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const currentClass = this.constructor.name
    throw new Error(
      `'handle' method not implemented in controller class '${currentClass}'`,
    )
  }

  protected handleError(error: any) {
    if (error instanceof CustomApiError) {
      throw error
    }

    const zodErrors = error instanceof ZodError ? error.issues : []
    throw new BadRequestError(error.message, zodErrors)
  }
}
