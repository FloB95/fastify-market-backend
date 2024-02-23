/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject, injectable } from 'tsyringe'
import { type User } from '../../domain/entities/User'
import { type IGetUsersUseCase } from '../../domain/use_cases/IGetUsersUseCase'
import { IUserRepository } from '../../domain/repositories/IUserRepository'

@injectable()
export class GetUsersUseCase implements IGetUsersUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  async execute(page: number, limit: number) {
    const offset = (page - 1) * limit
    const users = await this.userRepository.findAll(limit, offset)
    const total = 1

    return {
      users,
      total,
    }
  }
}
