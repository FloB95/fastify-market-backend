// EventHandler für UserLoggedInEvent.

import { type UserCreatedEvent } from '~/core/domain/events/user/UserCreatedEvent'

export class UserCreatedEventHandler {
  handle(event: UserCreatedEvent): void {
    console.log(`User Created: ${event.user.email}`)
  }
}
