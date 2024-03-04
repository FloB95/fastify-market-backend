import loadConfigurations from '~/core/config/setup'
import { type FastifyInstance } from 'fastify'
import { connection } from '~/core/infrastructure/db/drizzle/setup'
import AppCache from '~/core/infrastructure/cache'
import { buildServer } from '~/core/infrastructure/fastify/server'

export let fastifyInstance: FastifyInstance
export const API_BASE_PATH = '/api/v1'

beforeAll(async () => {
  await loadConfigurations()
  fastifyInstance = await buildServer()
  await fastifyInstance.ready()
})

describe('Fastify Application Setup', () => {
  it('simple test', () => {
    expect(200).toBe(200)
  })
})

afterAll(() => {
  // disconnect from database
  void connection.end()

  // close fastify server
  void fastifyInstance.close()

  // disconnect from redis cache
  AppCache.disconnect()
})
