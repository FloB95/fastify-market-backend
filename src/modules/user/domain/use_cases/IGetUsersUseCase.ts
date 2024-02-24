import { type ISqlQueryFindBy } from '~/core/domain/repositories/BaseRepository'
import { type User } from '../entities/User'
import { type IBaseUseCase } from '~/core/domain/use_cases/BaseUseCase'

interface IGetUsersUseCaseResponse {
  users: User[]
  total: number
}
export interface IGetUsersUseCase extends IBaseUseCase {
  execute({
    limit,
    offset,
    select,
    where,
  }: ISqlQueryFindBy<User>): Promise<IGetUsersUseCaseResponse>
}
