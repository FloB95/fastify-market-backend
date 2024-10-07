import { type IUpdateUserDto } from '../../dtos/user/IUpdateUserDto'
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
   * @param {User} user The user that was updated.
   */
  constructor(
    public readonly user: User,
    public readonly updates: IUpdateUserDto,
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
