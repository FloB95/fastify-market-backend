import { type IUserResponseDto } from '~/core/domain/dtos/user/IUserResponseDto'

export interface IHttpRequest {
  body: any
  params: any
  query: any
  user?: IUserResponseDto
  headers: { [key: string]: any }
}
