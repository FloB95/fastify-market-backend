import { type User } from '../../entities/User'
import { BaseEvent } from '../BaseEvent'

/**
 * Represents an event that is triggered when a user logs in.
 */
export class UserLoggedInEvent extends BaseEvent {
  /**
   * The name of the event.
   */
  static readonly eventName = 'UserLoggedIn'

  /**
   * Creates an instance of UserLoggedInEvent.
   * @param {User} user The user that logged in.
   */
  constructor(public readonly user: User) {
    super()
  }

  /**
   * Gets the name of the event.
   * @returns {string} The name of the event.
   */
  eventName(): string {
    return UserLoggedInEvent.eventName
  }
}
