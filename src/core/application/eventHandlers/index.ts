import { container } from 'tsyringe'
import { type IEventEmitter } from '~/core/domain/events/IEventEmitter'
import { loadUserEvents } from './user'

/**
 * Loads event handlers.
 */
export function loadEventHandlers() {
  // resolve via string since inject is also done via string
  const emitter = container.resolve<IEventEmitter>('EventEmitter')

  // load user event handlers
  loadUserEvents(emitter)
}
