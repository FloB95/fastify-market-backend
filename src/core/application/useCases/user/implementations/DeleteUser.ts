import { inject, injectable } from 'tsyringe'
import { type IDeleteUserUseCase } from '../IDeleteUserUseCase'
import { IUserRepository } from '~/core/application/repositories/IUserRepository'
import { type User } from '~/core/domain/entities/User'

@injectable()
export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  async execute(user: User): Promise<boolean> {
    await this.userRepository.delete(user)

    return true
  }
}
