import loadConfigurations from '~/core/config/setup'
import { type FastifyInstance } from 'fastify'
import { buildServer } from '~/core/infrastructure/server'

export let fastifyInstance: FastifyInstance

beforeAll(async () => {
  void loadConfigurations()
  fastifyInstance = await buildServer()
})

describe('Fastify Application Setup', () => {
  it('simple test', () => {
    expect(200).toBe(200)
  })
})

afterAll(() => {
  void fastifyInstance.close()
})
