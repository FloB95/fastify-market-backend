import { type User } from '../../entities/User'
import { BaseEvent } from '../BaseEvent'

export class UserCreatedEvent extends BaseEvent {
  static readonly eventName = 'UserCreated'

  constructor(public readonly user: User) {
    super()
  }

  eventName(): string {
    return UserCreatedEvent.eventName
  }
}
