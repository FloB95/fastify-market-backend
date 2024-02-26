import { type BaseEvent } from './BaseEvent'

export interface IEventEmitter {
  emit(event: BaseEvent): void
  on(event: string, listener: (event: BaseEvent) => void): void
}
