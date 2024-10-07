import { container } from 'tsyringe'
import { type UserUpdatedEvent } from '~/core/domain/events/user/UserUpdatedEvent'
import { type IBaseLogger } from '~/core/domain/logger/IBaseLogger'

/**
 * Represents a UserUpdatedEventHandler.
 */
export class UserUpdatedEventHandler {
  logger: IBaseLogger
  constructor() {
    this.logger = container.resolve<IBaseLogger>('Logger')
  }

  /**
   * Handles a UserUpdatedEvent.
   * @param event The UserUpdatedEvent to handle.
   */
  handle(event: UserUpdatedEvent): void {
    this.logger.info(`User updated:`, {
      user: event.user,
      updates: event.updates,
    })
  }
}
