import { type IBaseUseCase } from '~/core/application/useCases/IBaseUseCase'
import { type User } from '~/core/domain/entities/User'
import { type ISqlQueryFindBy } from '../../repositories/IBaseRepository'

/**
 * Interface for the Get Users Use Case Response.
 */
export interface IGetUsersUseCaseResponse {
  users: User[]
  total: number
}

/**
 * Interface for the Get Users Use Case.
 */
export interface IGetUsersUseCase extends IBaseUseCase {
  /**
   * Executes the Get Users Use Case.
   * @param query The query parameters for finding users.
   * @returns The response containing users and total count.
   */
  execute({
    limit,
    offset,
    select,
    where,
  }: ISqlQueryFindBy<User>): Promise<IGetUsersUseCaseResponse>
}
