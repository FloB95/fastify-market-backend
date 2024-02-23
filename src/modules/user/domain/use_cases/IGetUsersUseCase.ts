import { type ISqlQueryFindBy } from '~/core/domain/repositories/BaseRepository'
import { type User } from '../entities/User'

interface IGetUsersUseCaseResponse {
  users: User[]
  total: number
}
export interface IGetUsersUseCase {
  execute({
    limit,
    offset,
    select,
    where,
  }: ISqlQueryFindBy<User>): Promise<IGetUsersUseCaseResponse>
}
