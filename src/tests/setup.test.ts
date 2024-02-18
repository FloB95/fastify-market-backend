import loadConfigurations from '~/core/config/setup'
import { type FastifyInstance } from 'fastify'
import { buildServer } from '~/core/infrastructure/server'
import { connection } from '~/core/infrastructure/db/drizzle/setup'

export let fastifyInstance: FastifyInstance
export const API_BASE_PATH = '/api/v1'

beforeAll(async () => {
  await loadConfigurations()
  fastifyInstance = await buildServer()
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
})
