import { type BaseEvent } from './BaseEvent'

export interface IEventEmitter {
  emit(event: BaseEvent, ...args: any[]): void
  on(event: string, listener: (event: BaseEvent) => void): void
}
