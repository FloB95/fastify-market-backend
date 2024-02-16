import fastify, { type FastifyInstance } from 'fastify'
import routes from './api/v1/routes'
import { logger } from '../lib/logger'
import { fastifyErrorHandler } from '../lib/fastify'
import fastifyCors from '@fastify/cors'
import fastifyHelmet from '@fastify/helmet'

const port = process.env.API_PORT || 5000

export const buildServer = (): FastifyInstance => {
  const server = fastify({
    logger,
  })

  // register security modules
  void server.register(fastifyCors)
  void server.register(fastifyHelmet)

  // register routes
  void server.register(routes, { prefix: '/api/v1' })

  // health check
  server.get('/', async (req, resp) => {
    void resp.send({ status: 'ok' })
  })

  // register error handler
  server.setErrorHandler(fastifyErrorHandler)

  if (process.env.NODE_ENV === 'production') {
    for (const signal of ['SIGINT', 'SIGTERM']) {
      process.on(signal, () =>
        server.close().then((err) => {
          console.log(`close application on ${signal}`)
          process.exit(err ? 1 : 0)
        }),
      )
    }
  }

  return server
}

export const startServer = async () => {
  try {
    const server = buildServer()

    const serverOptions: any = {
      port,
    }
    await server.listen(serverOptions)
  } catch (e) {
    console.error(e)
  }
}

process.on('unhandledRejection', (e) => {
  console.error(e)
  process.exit(1)
})
