import { type User } from '../../entities/User'
import { BaseEvent } from '../BaseEvent'

/**
 * Represents an event that is triggered when a user is updated.
 */
export class UserUpdatedEvent extends BaseEvent {
  /**
   * The name of the event.
   */
  static readonly eventName = 'UserUpdated'

  /**
   * Creates an instance of UserUpdatedEvent.
   * @param {User} oldUser The user before the update.
   * @param {User} updatedUser The updated user.
   */
  constructor(
    public readonly oldUser: User,
    public readonly updatedUser: User,
  ) {
    super()
  }

  /**
   * Gets the name of the event.
   * @returns {string} The name of the event.
   */
  eventName(): string {
    return UserUpdatedEvent.eventName
  }
}
