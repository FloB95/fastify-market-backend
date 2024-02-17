import 'dotenv/config'
import { migrate } from 'drizzle-orm/mysql2/migrator'
import { db, connection } from './setup'
import { logger } from '../../logger'

export const migrateDb = async (closeConnection = true) => {
  if (!db || !connection) {
    throw new Error('Database not initialized')
  }

  // This will run migrations on the database, skipping the ones already applied
  await migrate(db, {
    migrationsFolder: './src/core/infrastructure/db/drizzle/migrations',
  })
    .then(() => {
      logger.info('INIT', 'Migrated database')
    })
    .catch((error) => {
      logger.error('INIT', `Failed to migrate database ${String(error)}`)
      throw new Error(`Failed to migrate database ${String(error)}`)
    })
  // Don't forget to close the connection, otherwise the script will hang
  if (closeConnection) {
    await connection.end()
  }
}
