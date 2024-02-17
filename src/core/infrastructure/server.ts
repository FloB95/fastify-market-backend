import fastify, { type FastifyInstance } from 'fastify'
import { logger } from './logger'
import { fastifyErrorHandler } from './fastify'
import fastifyCors from '@fastify/cors'
import fastifyHelmet from '@fastify/helmet'
import routes from '../adapters/api/v1/routes'
import { swaggerDocumentation } from './documentation/swagger'
import swagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

const port = process.env.API_PORT || 5000

export const buildServer = async (): Promise<FastifyInstance> => {
  const server = fastify({
    logger,
  })

  // register swagger documentation
  void server.register(swagger, {
    swagger: {
      info: {
        title: 'Marketplace API',
        description: 'Marketplace API Documentation',
        version: '1.0.0',
      },
      tags: [
        { name: 'User', description: 'User related end-points' },
        { name: 'Product', description: 'Product related end-points' },
      ],
    },
  })
  void server.register(fastifySwaggerUi, swaggerDocumentation)

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
          logger.warn(`close application on ${signal}`)
          process.exit(err ? 1 : 0)
        }),
      )
    }
  }

  await server.ready()
  server.swagger()

  return server
}

export const startServer = async () => {
  try {
    const server = await buildServer()
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
