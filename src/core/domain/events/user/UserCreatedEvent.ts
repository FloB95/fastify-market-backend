import { type User } from '../../entities/User'
import { BaseEvent } from '../BaseEvent'

/**
 * Represents an event that is triggered when a user is created.
 */
export class UserCreatedEvent extends BaseEvent {
  /**
   * The name of the event.
   */
  static readonly eventName = 'UserCreated'

  /**
   * Creates an instance of UserCreatedEvent.
   * @param {User} user The user that was created.
   */
  constructor(public readonly user: User) {
    super()
  }

  /**
   * Gets the name of the event.
   * @returns {string} The name of the event.
   */
  eventName(): string {
    return UserCreatedEvent.eventName
  }
}
