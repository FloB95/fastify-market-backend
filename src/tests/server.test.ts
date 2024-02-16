import { type FastifyInstance } from 'fastify'
import { buildServer } from '~/core/infrastructure/server'

describe('Fastify Application', () => {
  let fastify: FastifyInstance

  beforeAll(async () => {
    // Set up the Fastify instance for testing
    fastify = buildServer()
    await fastify.ready()
  })

  afterAll(async () => {
    // Close the Fastify instance after testing
    await fastify.close()
  })

  it('should respond with status: ok', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/',
    })

    expect(response.statusCode).toBe(200)
    // convert the response payload to
    expect(response.json()).toEqual({ status: 'ok' })
  })
})
