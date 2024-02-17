import { type MySqlTableWithColumns } from 'drizzle-orm/mysql-core'
import { v4 as uuidv4 } from 'uuid'
import { db } from '~/core/infrastructure/db/drizzle/setup'
import type IBaseRepository from '~/core/interfaces/repositories/BaseRepository'

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  abstract table: MySqlTableWithColumns<any>
  abstract findAll(max: number): Promise<T[]>
  abstract findById(id: string): Promise<T | undefined>
  abstract create(item: T): Promise<T>
  abstract update(item: T): Promise<T>
  abstract delete(id: string): Promise<boolean>

  public async generateId(): Promise<string> {
    let newId: string

    while (true) {
      newId = uuidv4()

      const existing = await db
        .select()
        .from(this.table)
        // @ts-ignore
        .where({ id: newId })
        .execute()

      if (existing.length === 0) {
        break
      }
    }

    return newId
  }
}
