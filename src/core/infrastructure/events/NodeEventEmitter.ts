import { EventEmitter } from 'events'
import { injectable, singleton } from 'tsyringe'
import { type BaseEvent } from '~/core/domain/events/BaseEvent'
import { type IEventEmitter } from '~/core/domain/events/IEventEmitter'

@injectable()
@singleton()
export class NodeEventEmitter implements IEventEmitter {
  private emitter: EventEmitter
  constructor() {
    this.emitter = new EventEmitter()
  }

  emit(event: BaseEvent): void {
    this.emitter.emit(event.eventName(), event)
  }

  on(eventName: string, listener: (event: BaseEvent) => void): void {
    this.emitter.on(eventName, listener)
  }
}
