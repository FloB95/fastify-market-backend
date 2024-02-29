// import env
import './env'

// tsyringe dependency injection
import 'reflect-metadata'

// import all dependencies
import './di'

// other imports
import { initDb } from '../infrastructure/db/drizzle/setup'
import { loadEventHandlers } from '../application/eventHandlers'

export default async function loadConfigurations() {
  // initialize the database
  await initDb()

  // event listeners
  loadEventHandlers()
}
