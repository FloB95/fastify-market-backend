import { inject, injectable } from 'tsyringe'
import { type IdOrEmail, type IGetOneUserByUseCase } from '../IGetUserByUseCase'
import { IUserRepository } from '~/core/application/repositories/IUserRepository'
import { type User } from '~/core/domain/entities/User'

@injectable()
export class GetOneUserByUseCase implements IGetOneUserByUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  async execute(where: IdOrEmail): Promise<User | undefined> {
    // if id find by id else find by email
    if ('id' in where) {
      return await this.userRepository.findOneById(where.id)
    }

    return await this.userRepository.findOneByEmail(where.email)
  }
}
