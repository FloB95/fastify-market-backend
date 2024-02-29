import { type UserCreatedEvent } from '~/core/domain/events/user/UserCreatedEvent'

/**
 * Represents a UserCreatedEventHandler.
 */
export class UserCreatedEventHandler {
  /**
   * Handles a UserCreatedEvent.
   * @param event The UserCreatedEvent to handle.
   */
  handle(event: UserCreatedEvent): void {
    console.log(`User Created: ${event.user.email}`)
  }
}
