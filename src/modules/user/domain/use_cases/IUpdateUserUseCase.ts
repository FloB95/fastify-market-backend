import { type User } from '../entities/User'

export interface IUpdateUserUseCase {
  execute(userToUpdate: User, updates: Partial<User>): Promise<User>
}
