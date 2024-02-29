import { type IBaseUseCase } from '~/core/application/useCases/IBaseUseCase'
import { type ICreateUserDto } from '~/core/domain/dtos/user/ICreateUserDto'
import { type User } from '~/core/domain/entities/User'

/**
 * Interface for the Create User Use Case.
 */
export interface ICreateUserUseCase extends IBaseUseCase {
  /**
   * Executes the Create User Use Case.
   * @param user The user data to create a new user.
   * @returns The created user.
   */
  execute(user: ICreateUserDto): Promise<User>
}
