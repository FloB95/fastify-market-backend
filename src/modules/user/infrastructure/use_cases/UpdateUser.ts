import { inject, injectable } from 'tsyringe'
import { type User } from '../../domain/entities/User'
import { IUserRepository } from '../../domain/repositories/IUserRepository'
import { type IUpdateUserUseCase } from '../../domain/use_cases/IUpdateUserUseCase'

@injectable()
export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  async execute(user: User, updates: Partial<User>): Promise<User> {
    updates.updatedAt = new Date()
    await this.userRepository.update(user, updates)

    const updatedUser = await this.userRepository.findOneById(user.id)

    return updatedUser
  }
}
