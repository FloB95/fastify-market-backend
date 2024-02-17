/* eslint-disable @typescript-eslint/no-unused-vars */
import { inject, injectable } from 'tsyringe'
import { sleep } from '~/core/utils/general'
import { type User } from '../../domain/entities/User'
import { type IGetUsersUseCase } from '../../domain/use_cases/IGetUsersUseCase'
import { IUserRepository } from '../../domain/repositories/IUserRepository'

@injectable()
export class GetUsersUseCase implements IGetUsersUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  async execute(page: number, limit: number): Promise<User[]> {
    return await this.userRepository.findAll(limit)
  }
}
