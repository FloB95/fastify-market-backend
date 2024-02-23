/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject, injectable } from 'tsyringe'
import { type IGetUsersUseCase } from '../../domain/use_cases/IGetUsersUseCase'
import { IUserRepository } from '../../domain/repositories/IUserRepository'
import { type ISqlQueryFindBy } from '~/core/domain/repositories/BaseRepository'
import { type User } from '../../domain/entities/User'

@injectable()
export class GetUsersUseCase implements IGetUsersUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  async execute({ limit, offset: page, select, where }: ISqlQueryFindBy<User>) {
    const offset = (page - 1) * limit
    const users = await this.userRepository.findAll({
      limit,
      offset,
      select,
      where,
    })
    const total = await this.userRepository.countTotal()

    return {
      users,
      total,
    }
  }
}
