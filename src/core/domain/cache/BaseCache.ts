export interface IBaseCache {
  set(key: string, value: string | Buffer | number): Promise<void>
  get(key: string): Promise<string | Buffer | number | null>
  del(key: string): Promise<void>
  disconnect(): void
}
