import { inject, injectable } from 'tsyringe'
import { type IDeleteUserUseCase } from '../IDeleteUserUseCase'
import { IUserRepository } from '~/core/application/repositories/IUserRepository'
import { type User } from '~/core/domain/entities/User'
import { IBaseKeyCache } from '~/core/application/cache/IBaseKeyCache'

@injectable()
export class DeleteUserUseCase implements IDeleteUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('ApplicationKeyCache') private appCache: IBaseKeyCache,
  ) {}

  /**
   * Executes the DeleteUserUseCase.
   * @param user The user to delete.
   * @returns A boolean indicating whether the user was successfully deleted.
   */
  async execute(user: User): Promise<boolean> {
    await this.userRepository.delete(user)

    // clear total count cache
    try {
      void this.appCache.del(this.userRepository.getTotalCacheKey())
    } catch (error) {}

    return true
  }
}
