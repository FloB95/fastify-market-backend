/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */
import { type IUserRepository } from '../../domain/repositories/IUserRepository'
import { User } from '../../domain/entities/User'
import { injectable } from 'tsyringe'
import { db } from '~/core/infrastructure/db/drizzle/setup'
import { usersTable } from '~/core/infrastructure/db/drizzle/schema'
import { BaseRepository } from '~/core/adapters/repositories/BaseRepository'

type NewUser = typeof usersTable.$inferInsert
@injectable()
class UserRepository extends BaseRepository<User> implements IUserRepository {
  table = usersTable
  async findAll(max: number, offset: number): Promise<User[]> {
    const users = await db.query.usersTable.findMany({
      limit: max,
      offset,
      orderBy: (u, { desc }) => [desc(u.createdAt)],
    })
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
        updatedAt: user.updatedAt,
      } as NewUser)
      .execute()

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

    user.setCreatedAt(new Date(dbUser.createdAt))
    user.setUpdatedAt(dbUser.updatedAt ? new Date(dbUser.updatedAt) : null)
    return user
  }
}

export default UserRepository
