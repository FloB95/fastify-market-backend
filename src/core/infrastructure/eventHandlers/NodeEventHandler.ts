import { EventEmitter } from 'events'
import { type IBaseEventHandler } from '~/core/interfaces/events/BaseEventHandler'

export class NodeEventHandler implements IBaseEventHandler {
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
