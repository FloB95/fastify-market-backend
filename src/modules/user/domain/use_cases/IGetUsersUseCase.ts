import { type User } from '../entities/User'

interface IGetUsersUseCaseResponse {
  users: User[]
  total: number
}
export interface IGetUsersUseCase {
  execute(page: number, limit: number): Promise<IGetUsersUseCaseResponse>
}
