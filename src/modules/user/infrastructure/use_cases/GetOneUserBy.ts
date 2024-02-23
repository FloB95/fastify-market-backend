import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '../../domain/repositories/IUserRepository'
import { type IGetOneUserByUseCase } from '../../domain/use_cases/IGetUserByUseCase'

@injectable()
export class GetOneUserByUseCase implements IGetOneUserByUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  async execute(where) {
    // if id find by id else find by email
    if ('id' in where) {
      return await this.userRepository.findOneById(where.id)
    }

    return await this.userRepository.findOneByEmail(where.email)
  }
}
