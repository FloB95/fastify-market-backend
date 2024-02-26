import Redis from 'ioredis'
import { injectable } from 'tsyringe'
import { type IBaseKeyCache } from '~/core/application/cache/IBaseKeyCache'
import { env } from '~/core/config/env'

@injectable()
export class RedisCache implements IBaseKeyCache {
  private client: Redis

  constructor() {
    this.client = new Redis(env.REDIS_URL, {
      maxRetriesPerRequest: 3,
    })
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
