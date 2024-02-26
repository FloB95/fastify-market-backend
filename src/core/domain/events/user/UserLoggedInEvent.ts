import { type User } from '../../entities/User'
import { BaseEvent } from '../BaseEvent'

export class UserLoggedInEvent extends BaseEvent {
  constructor(public readonly user: User) {
    super()
  }

  eventName(): string {
    return 'UserLoggedIn'
  }
}
