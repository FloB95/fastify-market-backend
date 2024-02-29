import { type IBaseUseCase } from '~/core/application/useCases/IBaseUseCase'
import { type User } from '~/core/domain/entities/User'

/**
 * Interface for the Update User Use Case.
 */
export interface IUpdateUserUseCase extends IBaseUseCase {
  /**
   * Executes the Update User Use Case.
   * @param userToUpdate The user to update.
   * @param updates The partial user data to update the user with.
   * @returns The updated user.
   */
  execute(userToUpdate: User, updates: Partial<User>): Promise<User>
}
