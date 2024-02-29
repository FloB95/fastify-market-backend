import { type IEventEmitter } from '~/core/domain/events/IEventEmitter'
import { UserCreatedEvent } from '~/core/domain/events/user/UserCreatedEvent'
import { UserLoggedInEvent } from '~/core/domain/events/user/UserLoggedInEvent'
import { UserCreatedEventHandler } from './UserCreatedEventHandler'
import { UserLoggedInEventHandler } from './UserLoggedInEventHandler'

/**
 * Loads user event handlers.
 * @param emitter The event emitter to attach the handlers to.
 */
export function loadUserEvents(emitter: IEventEmitter) {
  // user created event handler
  const userCreatedHandler = new UserCreatedEventHandler()
  emitter.on<UserCreatedEvent>(UserCreatedEvent.eventName, (e) =>
    userCreatedHandler.handle(e),
  )

  // user login event handler
  const userLoggedInHandler = new UserLoggedInEventHandler()
  emitter.on<UserLoggedInEvent>(UserLoggedInEvent.eventName, (e) =>
    userLoggedInHandler.handle(e),
  )
}
