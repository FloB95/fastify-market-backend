import { type IHttpRequest } from './IRequest'
import { type IHttpResponse } from './IResponse'

/**
 * Interface for controllers that handle HTTP requests.
 */
export interface IController {
  /**
   * Handles an HTTP request and returns an HTTP response.
   * @param httpRequest The HTTP request to handle.
   * @returns A promise that resolves to an HTTP response.
   */
  handle(httpRequest: IHttpRequest): Promise<IHttpResponse>
}
