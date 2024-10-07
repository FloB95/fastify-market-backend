import { inject, injectable } from 'tsyringe'
import { type IDeleteUserUseCase } from '../IDeleteUserUseCase'
import { type IUserRepository } from '~/core/application/repositories/IUserRepository'
import { type User } from '~/core/domain/entities/User'
import { type IBaseKeyCache } from '~/core/application/cache/IBaseKeyCache'
import { type IUserResponseDto } from '~/core/domain/dtos/user/IUserResponseDto'
import { type IEventEmitter } from '~/core/domain/events/IEventEmitter'
import { UserDeletedEvent } from '~/core/domain/events/user/UserDeletedEvent'

@injectable()
export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('ApplicationKeyCache') private appCache: IBaseKeyCache,
    @inject('EventEmitter') private eventEmitter: IEventEmitter,
  ) {}

  /**
   * Executes the DeleteUserUseCase.
   * @param user The user to delete.
   * @param deletedBy The user that is deleting the user.
   * @returns A boolean indicating whether the user was successfully deleted.
   */
  async execute(user: User, deletedBy: IUserResponseDto): Promise<boolean> {
    await this.userRepository.delete(user)

    // emit events
    const userDeletedEvent = new UserDeletedEvent(user, deletedBy)
    this.eventEmitter.emit(userDeletedEvent)

    // clear total count cache
    try {
      void this.appCache.del(this.userRepository.getTotalCacheKey())
    } catch (error) {}

    return true
  }
}
