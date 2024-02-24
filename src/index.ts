import loadConfigurations from './core/config/setup'
import { connection, initDb } from './core/infrastructure/db/drizzle/setup'
import { startServer } from './core/infrastructure/server'

async function startUp() {
  await loadConfigurations()
  await startServer()

  // if server is running and database is not connected, connect database again
  connection.on('end', async () => {
    console.log('Database connection closed, reconnecting')
    await initDb()
  })
}

void startUp()
