import { container } from 'tsyringe'
import { type UserLoggedInEvent } from '~/core/domain/events/user/UserLoggedInEvent'
import { type IBaseLogger } from '~/core/domain/logger/IBaseLogger'

/**
 * Represents a UserLoggedInEventHandler.
 */
export class UserLoggedInEventHandler {
  logger: IBaseLogger
  constructor() {
    this.logger = container.resolve<IBaseLogger>('Logger')
  }

  /**
   * Handles a UserLoggedInEvent.
   * @param event The UserLoggedInEvent to handle.
   */
  handle(event: UserLoggedInEvent): void {
    this.logger.info(`User Logged In: ${event.user.email}`)
  }
}
