export interface IHttpRequest {
  body: any
  params: any
  query: any
  headers: { [key: string]: any }
}
