import { type UserLoggedInEvent } from '~/core/domain/events/user/UserLoggedInEvent'

/**
 * Represents a UserLoggedInEventHandler.
 */
export class UserLoggedInEventHandler {
  /**
   * Handles a UserLoggedInEvent.
   * @param event The UserLoggedInEvent to handle.
   */
  handle(event: UserLoggedInEvent): void {
    console.log(`User Logged In: ${event.user.email}`)
    // Execute necessary logic here, e.g., Audit Logging.
  }
}
