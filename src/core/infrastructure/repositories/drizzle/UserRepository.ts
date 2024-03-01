import { inject, injectable } from 'tsyringe'
import { db } from '~/core/infrastructure/db/drizzle/setup'
import { usersTable } from '~/core/infrastructure/db/drizzle/schema'
import { desc, eq } from 'drizzle-orm'
import {
  convertQuerySelectToDrizzle,
  convertWhereConditionToDrizzle,
} from '~/core/infrastructure/db/drizzle/utils'
import { BaseRepository } from './BaseRepository'
import { type IUserRepository } from '~/core/application/repositories/IUserRepository'
import { type ISqlQueryFindBy } from '~/core/application/repositories/IBaseRepository'
import { User } from '~/core/domain/entities/User'
import { IBaseKeyCache } from '~/core/application/cache/IBaseKeyCache'

type NewUser = typeof usersTable.$inferInsert

/**
 * Repository for managing User entities.
 */
@injectable()
class UserRepository extends BaseRepository<User> implements IUserRepository {
  table = usersTable

  constructor(@inject('ApplicationKeyCache') appCache: IBaseKeyCache) {
    super(appCache)
  }

  /**
   * Finds all users based on the provided query parameters.
   * @param options - Query options.
   * @returns A promise that resolves to an array of users.
   */
  async findAll({
    limit,
    offset,
    select,
    where,
  }: ISqlQueryFindBy<User>): Promise<User[]> {
    const whereDrizzle = where
      ? convertWhereConditionToDrizzle<User>(where, this.table)
      : undefined

    const drizzleSelect = convertQuerySelectToDrizzle(select, this.table)

    let usersQuery
    if (drizzleSelect) {
      usersQuery = db
        .select(drizzleSelect)
        .from(this.table)
        .orderBy(desc(this.table.createdAt))
        .limit(limit)
        .offset(offset)
    } else {
      usersQuery = db
        .select()
        .from(this.table)
        .orderBy(desc(this.table.createdAt))
        .limit(limit)
        .offset(offset)
    }

    if (whereDrizzle) usersQuery.where(whereDrizzle)

    const users = await usersQuery.execute()

    return users.map((user) => UserRepository.mapDbEntryToUser(user))
  }

  /**
   * Finds a user by their ID.
   * @param id - The ID of the user.
   * @returns A promise that resolves to the user if found, otherwise undefined.
   */
  async findOneById(id: string): Promise<User | undefined> {
    const user = await db.query.usersTable.findFirst({
      where: eq(this.table.id, id),
    })
    return user ? UserRepository.mapDbEntryToUser(user) : undefined
  }

  /**
   * Finds a user by their email address.
   * @param email - The email address of the user.
   * @returns A promise that resolves to the user if found, otherwise undefined.
   */
  async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await db.query.usersTable.findFirst({
      where: eq(this.table.email, email),
    })

    return user ? UserRepository.mapDbEntryToUser(user) : undefined
  }

  /**
   * Updates a user with the provided updates.
   * @param user - The user to update.
   * @param updates - The updates to apply to the user.
   */
  async update(user: User, updates: Partial<User>): Promise<void> {
    await db.update(this.table).set(updates).where(eq(this.table.id, user.id))
  }

  /**
   * Deletes a user.
   * @param user - The user to delete.
   * @returns A promise that resolves to true if the user was deleted successfully.
   */
  async delete(user: User): Promise<boolean> {
    await db.delete(this.table).where(eq(this.table.id, user.id)).execute()
    return true
  }

  /**
   * Creates a new user.
   * @param user - The user to create.
   */
  async create(user: User): Promise<void> {
    await db
      .insert(this.table)
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
  }

  /**
   * Maps a database entry to a User entity.
   * @param dbUser - The database entry representing a user.
   * @returns The mapped User entity.
   */
  public static mapDbEntryToUser(dbUser: any): User {
    const user = new User(
      dbUser.id,
      dbUser.firstname,
      dbUser.lastname,
      dbUser.email,
      dbUser.password,
    )

    user.setCreatedAt(dbUser.createdAt ? new Date(dbUser.createdAt) : undefined)

    // can be null if db field is empty or can be undefined if not selected
    if (typeof dbUser.updatedAt !== 'undefined') {
      user.setUpdatedAt(dbUser.updatedAt ? new Date(dbUser.updatedAt) : null)
    } else {
      user.setUpdatedAt(undefined)
    }
    return user
  }
}

export default UserRepository
