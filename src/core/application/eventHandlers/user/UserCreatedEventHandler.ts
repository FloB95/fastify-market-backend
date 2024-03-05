import { container } from 'tsyringe'
import { type UserCreatedEvent } from '~/core/domain/events/user/UserCreatedEvent'
import { type IBaseLogger } from '~/core/domain/logger/IBaseLogger'

/**
 * Represents a UserCreatedEventHandler.
 */
export class UserCreatedEventHandler {
  logger: IBaseLogger
    constructor(
  ) {
    this.logger = container.resolve<IBaseLogger>('Logger')
  }

  /**
   * Handles a UserCreatedEvent.
   * @param event The UserCreatedEvent to handle.
   */
  handle(event: UserCreatedEvent): void {
    this.logger.info(`User Created: ${event.user.email}`)
  }
}
