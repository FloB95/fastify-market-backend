import { EventEmitter } from 'events'
import { inject, injectable } from 'tsyringe'
import { type ICreateUserUseCase } from '../../domain/use_cases/ICreateUserUseCase'
import { User, type TUser } from '../../domain/entities/User'
import { logger } from '~/core/infrastructure/logger'
import { IUserRepository } from '../../domain/repositories/IUserRepository'

@injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  private eventEmitter: EventEmitter

  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {
    this.eventEmitter = new EventEmitter()
    this.eventEmitter.on('userCreated', (user) => {
      logger.info(`User created: ${user.email}`)
    })
  }

  async execute(user: TUser): Promise<User> {
    const newUser = new User(
      await this.userRepository.generateId(),
      user.firstname,
      user.lastname,
      user.email,
      user.password,
    )

    await this.userRepository.create(newUser)
    this.eventEmitter.emit('userCreated', user)
    return newUser
  }
}
