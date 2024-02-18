import { inject, injectable } from 'tsyringe'
import { type ICreateUserUseCase } from '../../domain/use_cases/ICreateUserUseCase'
import { User, type TUser } from '../../domain/entities/User'
import { IUserRepository } from '../../domain/repositories/IUserRepository'
import { emitUserCreatedEvent } from '../../application/events/UserEvents'

@injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  async execute(user: TUser): Promise<User> {
    const newUser = new User(
      await this.userRepository.generateId(),
      user.firstname,
      user.lastname,
      user.email,
      user.password,
    )

    await this.userRepository.create(newUser)
    emitUserCreatedEvent(newUser)
    return newUser
  }
}
