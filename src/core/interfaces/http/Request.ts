export interface IHttpRequest {
  body: any
  params: any
  query: any
  headers: {[key: string]: any}
}

export interface IHttpResponse {
  statusCode: number
  data: any
  headers: { [key: string]: any }
}