import { type IBaseUseCase } from '~/core/application/useCases/IBaseUseCase'
import { type User } from '~/core/domain/entities/User'

/**
 * Type representing an Id or Email.
 */
export type IdOrEmail =
  | {
      id: string
    }
  | {
      email: string
    }

/**
 * Interface for the Get One User By Use Case.
 */
export interface IGetOneUserByUseCase extends IBaseUseCase {
  /**
   * Executes the Get One User By Use Case.
   * @param where The criteria to search for a user. Can be an id or an email.
   * @returns The user if found, otherwise undefined.
   */
  execute(where: IdOrEmail): Promise<User | undefined>
}
