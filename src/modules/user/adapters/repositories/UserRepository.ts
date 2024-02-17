/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */
import { type IUserRepository } from '../../domain/repositories/IUserRepository'
import { User } from '../../domain/entities/User'
import { injectable } from 'tsyringe'
import { db } from '~/core/infrastructure/db/drizzle/setup'
import { usersTable } from '~/core/infrastructure/db/drizzle/schema'

type NewUser = typeof usersTable.$inferInsert
@injectable()
class UserRepository implements IUserRepository {
  async findAll(max: number): Promise<User[]> {
    // TODO password is not returned
    const users = await db.query.usersTable.findMany()
    return users.map((user) => UserRepository.mapDbEntryToUser(user))
  }

  async findById(id: string): Promise<User | undefined> {
    throw new Error('Method not implemented.')
  }

  async update(item: User): Promise<User> {
    throw new Error('Method not implemented.')
  }

  async delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  async create(user: User): Promise<User> {
    await db
      .insert(usersTable)
      .values({
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt, // Convert Date to string,
      } as NewUser)
      .execute()

    // TODO get user by id ??
    return user
  }

  public static mapDbEntryToUser(dbUser: any): User {
    const user = new User(
      dbUser.id,
      dbUser.firstname,
      dbUser.lastname,
      dbUser.email,
      dbUser.password,
    )

    user.setCreatedAt(dbUser.createdAt)
    user.setUpdatedAt(dbUser.updatedAt)

    return user
  }
}

export default UserRepository
