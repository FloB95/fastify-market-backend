import Redis from 'ioredis'
import { env } from '~/core/config/env'
import { type IBaseCache } from '~/core/domain/cache/BaseCache'

export class RedisCache implements IBaseCache {
  private client: Redis

  constructor() {
    this.client = new Redis(`rediss://${env.REDIS_URL}`)
  }

  async set(
    key: string,
    value: string | Buffer | number,
    expirationTimeSeconds?: number,
  ): Promise<void> {
    await this.client.set(key, value)
    if (expirationTimeSeconds) {
      await this.client.expire(key, expirationTimeSeconds)
    }
  }

  async get(key: string): Promise<string | Buffer | number | null> {
    return await this.client.get(key)
  }

  async del(key: string): Promise<void> {
    await this.client.del(key)
  }

  disconnect() {
    this.client.disconnect()
  }
}
