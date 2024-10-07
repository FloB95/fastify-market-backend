import { type IUserResponseDto } from '../../dtos/user/IUserResponseDto'
import { type User } from '../../entities/User'
import { BaseEvent } from '../BaseEvent'

/**
 * Represents an event that is triggered when a user is deleted.
 */
export class UserDeletedEvent extends BaseEvent {
  /**
   * The name of the event.
   */
  static readonly eventName = 'UserDeleted'

  /**
   * Creates an instance of UserDeletedEvent.
   * @param {User} user The user that was deleted.
   * @param {User} deletedBy The user that deleted the user.
   */
  constructor(
    public readonly user: User,
    public readonly deletedBy: IUserResponseDto,
  ) {
    super()
  }

  /**
   * Gets the name of the event.
   * @returns {string} The name of the event.
   */
  eventName(): string {
    return UserDeletedEvent.eventName
  }
}
