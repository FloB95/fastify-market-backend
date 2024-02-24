import { eq, sql } from 'drizzle-orm'
import { type MySqlTableWithColumns } from 'drizzle-orm/mysql-core'
import { v4 as uuidv4 } from 'uuid'
import { db } from '~/core/infrastructure/db/drizzle/setup'
import type IBaseRepository from '~/core/domain/repositories/BaseRepository'
import { type ISqlQueryFindBy } from '~/core/domain/repositories/BaseRepository'
import AppCache from '~/core/infrastructure/cache'

export abstract class BaseRepository<T> implements IBaseRepository<T> {
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
    const cacheCount = (await AppCache.get('userTableCountTotal')) as string

    if (!cacheCount) {
      const result = await db
        .select({
          count: sql<number>`count(${this.table.id})`,
        })
        .from(this.table)

      const count = result[0]?.count || 0
      await AppCache.set('userTableCountTotal', count, 60)

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
