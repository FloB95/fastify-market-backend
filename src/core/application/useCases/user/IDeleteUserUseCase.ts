import { type IBaseUseCase } from '~/core/application/useCases/IBaseUseCase'
import { type IUserResponseDto } from '~/core/domain/dtos/user/IUserResponseDto'
import { type User } from '~/core/domain/entities/User'

/**
 * Interface for the Delete User Use Case.
 */
export interface IDeleteUserUseCase extends IBaseUseCase {
  /**
   * Executes the Delete User Use Case.
   * @param user The user to delete.
   * @param deletedBy The user that is deleting the user.
   * @returns A boolean indicating whether the user was successfully deleted.
   */
  execute(user: User, deletedBy: IUserResponseDto): Promise<boolean>
}
