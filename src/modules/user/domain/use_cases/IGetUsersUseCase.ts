import { type User } from '../entities/User'

export interface IGetUsersUseCase {
  execute(page: number, limit: number): Promise<User[]>
}
