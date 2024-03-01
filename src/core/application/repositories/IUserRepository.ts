import { type User } from '~/core/domain/entities/User'
import type IBaseRepository from './IBaseRepository'
import { type ISqlQueryFindBy } from './IBaseRepository'

export interface IUserRepository extends IBaseRepository<User> {
  /**
   * Finds a user by email.
   * @param email The email of the user to find.
   * @returns A Promise that resolves to either a User or undefined.
   */
  findOneByEmail(email: string): Promise<User | undefined>

  /**
   * Finds all users based on the provided query parameters.
   * @param query An object containing query parameters like limit, offset, select, and where.
   * @returns A Promise that resolves to an array of Users.
   */
  findAll(query: ISqlQueryFindBy<User>): Promise<User[]>
}
