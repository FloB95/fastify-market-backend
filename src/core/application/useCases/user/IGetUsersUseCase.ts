import { type IBaseUseCase } from '~/core/application/useCases/IBaseUseCase'
import { type User } from '~/core/domain/entities/User'
import { type ISqlQueryFindBy } from '../../repositories/IBaseRepository'

export interface IGetUsersUseCaseResponse {
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
