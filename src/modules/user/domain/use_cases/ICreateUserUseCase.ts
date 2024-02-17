import { type TUser, type User } from '../entities/User'

export interface ICreateUserUseCase {
  execute(user: TUser): Promise<User>
}
