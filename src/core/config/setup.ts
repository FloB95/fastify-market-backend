// import env
import './env'

// tsyringe dependency injection
import 'reflect-metadata'

// load all modules
import '~/modules/user/setup'

// other imports
import { initDb } from '../infrastructure/db/drizzle/setup'
import { logger } from '../infrastructure/logger'
import { onUserCreated } from '~/modules/user/application/events/UserEvents'

export default async function loadConfigurations() {
  // initialize the database
  await initDb()

  // just a test to see if the event listener is working
  onUserCreated((event) => {
    logger.info(`User created: ${event.user.email} no async`)
  })
}
