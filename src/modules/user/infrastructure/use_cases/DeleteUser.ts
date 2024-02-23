import { inject, injectable } from 'tsyringe'
import { type User } from '../../domain/entities/User'
import { IUserRepository } from '../../domain/repositories/IUserRepository'
import { type IDeleteUserUseCase } from '../../domain/use_cases/IDeleteUserUseCase'
import { emitUserDeletedEvent } from '../../application/events/UserEvents'

@injectable()
export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  async execute(user: User): Promise<boolean> {
    await this.userRepository.delete(user)

    emitUserDeletedEvent(user)

    return true
  }
}
