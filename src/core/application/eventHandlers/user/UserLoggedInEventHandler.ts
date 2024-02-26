// EventHandler für UserLoggedInEvent.

import { type UserLoggedInEvent } from '~/core/domain/events/user/UserLoggedInEvent'

export class UserLoggedInEventHandler {
  handle(event: UserLoggedInEvent): void {
    console.log(`User Logged In: ${event.user.email}`)
    // Führen Sie hier die notwendige Logik aus, z.B. Audit Logging.
  }
}
