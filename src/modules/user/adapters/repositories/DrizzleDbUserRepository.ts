/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '../../domain/entities/User'
import { injectable } from 'tsyringe'
import { db } from '~/core/infrastructure/db/drizzle/setup'
import { usersTable } from '~/core/infrastructure/db/drizzle/schema'
import { BaseRepository } from '~/core/adapters/repositories/BaseRepository'
import { desc, eq } from 'drizzle-orm'
import { type ISqlQueryFindBy } from '~/core/domain/repositories/BaseRepository'
import { type IUserRepository } from '../../domain/repositories/IUserRepository'
import {
  convertQuerySelectToDrizzle,
  convertWhereConditionToDrizzle,
} from '~/core/infrastructure/db/drizzle/utils'

type NewUser = typeof usersTable.$inferInsert

@injectable()
class DrizzleDbUserRepository
  extends BaseRepository<User>
  implements IUserRepository
{
  table = usersTable

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

    return users.map((user) => DrizzleDbUserRepository.mapDbEntryToUser(user))
  }

  async findOneById(id: string): Promise<User | undefined> {
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.id, id),
    })
    return user ? DrizzleDbUserRepository.mapDbEntryToUser(user) : undefined
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    })

    return user ? DrizzleDbUserRepository.mapDbEntryToUser(user) : undefined
  }

  async update(user: User, updates: Partial<User>): Promise<void> {
    await db.update(this.table).set(updates).where(eq(this.table.id, user.id))
  }

  async delete(user: User): Promise<boolean> {
    await db.delete(this.table).where(eq(this.table.id, user.id)).execute()
    return true
  }

  async create(user: User): Promise<void> {
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
  }

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

export default DrizzleDbUserRepository
