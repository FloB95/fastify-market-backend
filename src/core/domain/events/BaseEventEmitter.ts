export interface IBaseEventEmitter {
  emit(event: string, ...args: any[]): void
  on(event: string, listener: (...args: any[]) => void): void
}