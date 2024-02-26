import { eq, sql } from 'drizzle-orm'
import { type MySqlTableWithColumns } from 'drizzle-orm/mysql-core'
import { v4 as uuidv4 } from 'uuid'
import { type IBaseKeyCache } from '~/core/application/cache/IBaseKeyCache'
import type IBaseRepository from '~/core/application/repositories/IBaseRepository'
import { type ISqlQueryFindBy } from '~/core/application/repositories/IBaseRepository'
import { db } from '~/core/infrastructure/db/drizzle/setup'

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  constructor(private appCache: IBaseKeyCache) {}

  abstract table: MySqlTableWithColumns<any>
  abstract findAll({
    limit,
    offset,
    select,
    where,
  }: ISqlQueryFindBy<T>): Promise<T[]>
  abstract findOneById(id: string): Promise<T | undefined>
  abstract create(item: T): Promise<void>
  abstract update(item: T, updates: Partial<T>): Promise<void>
  abstract delete(item: T): Promise<boolean>

  public async countTotal(): Promise<number> {
    const cacheCount = (await this.appCache.get(
      'userTableCountTotal',
    )) as string

    if (!cacheCount) {
      const result = await db
        .select({
          count: sql<number>`count(${this.table.id})`,
        })
        .from(this.table)

      const count = result[0]?.count || 0
      await this.appCache.set('userTableCountTotal', count, 60)

      return count
    }

    return parseInt(cacheCount)
  }

  public async generateId(): Promise<string> {
    let newId: string

    while (true) {
      newId = uuidv4()

      const existing = await db
        .select()
        .from(this.table)
        .where(eq(this.table.id, newId))
        .execute()

      if (existing.length === 0) {
        break
      }
    }

    return newId
  }
}
