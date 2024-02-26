// import env
import './env'

// tsyringe dependency injection
import 'reflect-metadata'

// import all dependencies
import './di'

// other imports
import { initDb } from '../infrastructure/db/drizzle/setup'
import { container } from 'tsyringe'
import { UserCreatedEventHandler } from '../application/eventHandlers/user/UserCreatedEventHandler'
import { type UserCreatedEvent } from '../domain/events/user/UserCreatedEvent'
import { type IEventEmitter } from '../domain/events/IEventEmitter'

export default async function loadConfigurations() {
  // initialize the database
  await initDb()

  // resolve via string since inject is also done via string
  const emitter = container.resolve<IEventEmitter>('EventEmitter')
  const userCreatedHandler = new UserCreatedEventHandler()
  emitter.on('UserCreated', (e) =>
    userCreatedHandler.handle(e as UserCreatedEvent),
  )
}
