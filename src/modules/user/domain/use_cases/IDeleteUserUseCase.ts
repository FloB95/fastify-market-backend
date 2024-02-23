import { type User } from '../entities/User'

export interface IDeleteUserUseCase {
  execute(user: User): Promise<boolean>
}
