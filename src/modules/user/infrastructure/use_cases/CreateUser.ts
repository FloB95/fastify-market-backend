import { EventEmitter } from 'events'
import { inject, injectable } from 'tsyringe'
import { type ICreateUserUseCase } from '../../domain/use_cases/ICreateUserUseCase'
import { type User } from '../../domain/entities/User'
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

  async execute(user: User): Promise<User> {
    await this.userRepository.create(user)
    this.eventEmitter.emit('userCreated', user)
    return user
  }
}
