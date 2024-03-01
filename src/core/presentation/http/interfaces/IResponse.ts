/**
 * Interface representing an HTTP response.
 * @interface
 */
export interface IHttpResponse {
  /**
   * The status code of the HTTP response.
   * @type {number}
   */
  statusCode: number

  /**
   * The data returned in the HTTP response.
   * @type {any}
   */
  data: any

  /**
   * The headers returned in the HTTP response.
   * @type {{ [key: string]: any }}
   */
  headers: { [key: string]: any }
}
