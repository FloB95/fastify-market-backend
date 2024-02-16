import { fastifyInstance } from '../setup.test'

test('Fastify Server Test', async () => {
  const response = await fastifyInstance.inject({
    method: 'GET',
    url: '/',
  })

  expect(response.statusCode).toBe(200)
  // convert the response payload to
  expect(response.json()).toEqual({ status: 'ok' })
})
