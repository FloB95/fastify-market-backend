import { EventEmitter } from 'events'
import { injectable } from 'tsyringe'
import { type BaseEvent } from '~/core/domain/events/BaseEvent'
import { type IEventEmitter } from '~/core/domain/events/IEventEmitter'

@injectable()
export class NodeEventEmitter implements IEventEmitter {
  private emitter = new EventEmitter()

  emit(event: BaseEvent): void {
    this.emitter.emit(event.eventName(), event)
  }

  on(eventName: string, listener: (event: BaseEvent) => void): void {
    this.emitter.on(eventName, listener)
  }
}
