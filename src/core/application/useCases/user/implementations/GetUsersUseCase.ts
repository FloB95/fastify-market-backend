import { inject, injectable } from 'tsyringe'
import {
  type IGetUsersUseCaseResponse,
  type IGetUsersUseCase,
} from '../IGetUsersUseCase'
import { type IUserRepository } from '~/core/application/repositories/IUserRepository'
import { type ISqlQueryFindBy } from '~/core/application/repositories/IBaseRepository'
import { type User } from '~/core/domain/entities/User'

@injectable()
export class GetUsersUseCase implements IGetUsersUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  /**
   * Executes the GetUsersUseCase.
   * @param {ISqlQueryFindBy<User>} query The query parameters for finding users.
   * @returns {IGetUsersUseCaseResponse} The response containing users and total count.
   */
  async execute({
    limit,
    offset: page,
    select,
    where,
  }: ISqlQueryFindBy<User>): Promise<IGetUsersUseCaseResponse> {
    const offset = (page - 1) * limit

    const users = await this.userRepository.findAll({
      limit,
      offset,
      select,
      where,
    })
    const total = await this.userRepository.countTotal()
    // const total = 1

    return {
      users,
      total,
    }
  }
}
