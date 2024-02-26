export interface IHttpResponse {
  statusCode: number
  data: any
  headers: { [key: string]: any }
}
