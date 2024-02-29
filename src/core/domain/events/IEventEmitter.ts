import { type BaseEvent } from './BaseEvent'

export interface IEventEmitter {
  emit(event: BaseEvent): void
  on<T>(event: string, listener: (event: T) => void): void
}
