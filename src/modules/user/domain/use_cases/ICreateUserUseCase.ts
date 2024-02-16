import { type User } from '../entities/User'

export interface ICreateUserUseCase {
  execute(user: User): Promise<User>
}
