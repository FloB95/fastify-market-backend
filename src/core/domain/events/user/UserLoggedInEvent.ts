import { type User } from '../../entities/User'
import { BaseEvent } from '../BaseEvent'

export class UserLoggedInEvent extends BaseEvent {
  static readonly eventName = 'UserLoggedIn'

  constructor(public readonly user: User) {
    super()
  }

  eventName(): string {
    return UserLoggedInEvent.eventName
  }
}
