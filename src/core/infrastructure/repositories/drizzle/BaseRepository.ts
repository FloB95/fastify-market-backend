import { eq, sql } from 'drizzle-orm'
import {
  type MySqlSelect,
  getTableConfig,
  type MySqlTableWithColumns,
  type MySqlSelectDynamic,
} from 'drizzle-orm/mysql-core'
import { v4 as uuidv4 } from 'uuid'
import { type IBaseKeyCache } from '~/core/application/cache/IBaseKeyCache'
import type IBaseRepository from '~/core/application/repositories/IBaseRepository'
import {
  type WhereConditions,
  type ISqlQueryFindBy,
} from '~/core/application/repositories/IBaseRepository'
import { db } from '~/core/infrastructure/db/drizzle/setup'
import { convertWhereConditionToDrizzle } from '../../db/drizzle/utils'

/**
 * Base class for repositories.
 */
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

  /**
   * Counts the total number of items in the table.
   * @returns A promise that resolves to the total count.
   */
  public async countTotal(): Promise<number> {
    const cacheCount = (await this.appCache.get(
      this.getTotalCacheKey(),
    )) as string

    if (!cacheCount) {
      const result = await db
        .select({
          count: sql<number>`count(${this.table.id})`,
        })
        .from(this.table)

      const count = result[0]?.count || 0
      await this.appCache.set(this.getTotalCacheKey(), count)

      return count
    }

    return parseInt(cacheCount)
  }

  public getTotalCacheKey(): string {
    const { name } = getTableConfig(this.table)
    return `${name}_table_count_total`
  }

  /**
   * Generates a new UUIDv4 ID.
   * @returns A promise that resolves to the generated ID.
   */
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

  public withPagination<T extends MySqlSelect>(
    qb: T,
    page: number,
    pageSize: number = 10,
  ): MySqlSelectDynamic<T> {
    return qb
      .limit(pageSize)
      .offset(page * pageSize)
      .$dynamic()
  }

  public withWhere<T extends MySqlSelect>(
    qb: T,
    where: WhereConditions<any>,
  ): MySqlSelectDynamic<T> {
    const whereDrizzle = where
      ? convertWhereConditionToDrizzle<T>(where, this.table)
      : undefined
    return qb.where(whereDrizzle).$dynamic()
  }
}
