import { type IBaseUseCase } from '~/core/application/useCases/IBaseUseCase'
import { type User } from '~/core/domain/entities/User'

/**
 * Interface for the Delete User Use Case.
 */
export interface IDeleteUserUseCase extends IBaseUseCase {
  /**
   * Executes the Delete User Use Case.
   * @param user The user to delete.
   * @returns A boolean indicating whether the user was successfully deleted.
   */
  execute(user: User): Promise<boolean>
}
