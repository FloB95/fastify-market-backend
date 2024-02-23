import { EventEmitter } from 'events'
import { type IBaseEventEmitter } from '~/core/domain/events/BaseEventEmitter'

export class NodeEventEmitter implements IBaseEventEmitter {
  private emitter: EventEmitter

  constructor() {
    this.emitter = new EventEmitter()
  }

  emit(event: string, ...args: any[]): void {
    this.emitter.emit(event, ...args)
  }

  on(event: string, listener: (...args: any[]) => void): void {
    this.emitter.on(event, listener)
  }
}
