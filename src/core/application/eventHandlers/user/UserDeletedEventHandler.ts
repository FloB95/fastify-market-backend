import { container } from 'tsyringe'
import { type UserDeletedEvent } from '~/core/domain/events/user/UserDeletedEvent'
import { type IBaseLogger } from '~/core/domain/logger/IBaseLogger'

/**
 * Represents a UserDeletedEventHandler.
 */
export class UserDeletedEventHandler {
  logger: IBaseLogger
  constructor() {
    this.logger = container.resolve<IBaseLogger>('Logger')
  }

  /**
   * Handles a UserDeletedEvent.
   * @param event The UserDeletedEvent to handle.
   */
  handle(event: UserDeletedEvent): void {
    this.logger.info(
      `User Deleted: ${event.user.email} by ${event.deletedBy.email} (${event.deletedBy.id})`,
    )
  }
}
