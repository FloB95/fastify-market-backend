import { EventEmitter } from 'events'
import { injectable, singleton } from 'tsyringe'
import { type BaseEvent } from '~/core/domain/events/BaseEvent'
import { type IEventEmitter } from '~/core/domain/events/IEventEmitter'

/**
 * NodeEventEmitter class for emitting and listening to events using Node.js EventEmitter.
 */
@injectable()
@singleton()
export class NodeEventEmitter implements IEventEmitter {
  private emitter: EventEmitter

  constructor() {
    this.emitter = new EventEmitter()
  }

  /**
   * Emits an event.
   * @param event The event to emit.
   */
  emit(event: BaseEvent): void {
    this.emitter.emit(event.eventName(), event)
  }

  /**
   * Registers a listener for an event.
   * @param eventName The name of the event to listen for.
   * @param listener The listener function to be called when the event is emitted.
   */
  on<T>(eventName: string, listener: (event: T) => void): void {
    this.emitter.on(eventName, listener)
  }
}
