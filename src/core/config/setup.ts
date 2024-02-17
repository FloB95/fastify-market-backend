// import env
import './env'

// tsyringe dependency injection
import 'reflect-metadata'

// load all modules
import 'src/modules/user/setup'

// other imports
import { initDb } from '../infrastructure/db/drizzle/setup'

export default async function loadConfigurations() {
  // initialize the database
  await initDb()
}
