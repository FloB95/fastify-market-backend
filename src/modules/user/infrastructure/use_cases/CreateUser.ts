import { EventEmitter } from 'events'
import { injectable } from 'tsyringe'
import { sleep } from '~/core/utils/general'
import { type ICreateUserUseCase } from '../../domain/use_cases/ICreateUserUseCase'
import { type User } from '../../domain/entities/User'

@injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  private users: User[] = []
  private eventEmitter: EventEmitter

  constructor() {
    this.eventEmitter = new EventEmitter()
    this.eventEmitter.on('userCreated', (user) => {
      console.log(`User created: ${user.email}`)
    })
  }

  async execute(user: User): Promise<User> {
    this.users.push(user)
    await sleep(1)
    this.eventEmitter.emit('userCreated', user)
    return user
  }
}
