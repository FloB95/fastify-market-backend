import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'
import * as schema from './schema'
import { type MySql2Database } from 'drizzle-orm/mysql2'
// import { migrateDb } from './migrate'
import { logger } from '../../logger'
import { env } from '~/core/config/env'

export let db: MySql2Database<typeof schema>
export let connection: mysql.Connection

export const initDb = async () => {
  try {
    logger.info('Initializing database')
    connection = await mysql.createConnection({
      host: env.DB_HOST,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      database: env.DB_NAME,
      multipleStatements: true,
    })

    db = drizzle(connection, { schema, mode: 'default' })

    // run migrations
    // await migrateDb()
  } catch (error) {
    logger.error('Failed to initialize database')
    logger.error(error.message)
    throw new Error('Failed to initialize database')
  }
}
