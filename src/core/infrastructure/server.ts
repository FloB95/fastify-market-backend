import fastify, { type FastifyInstance } from 'fastify'
import { logger } from './logger'
import { fastifyErrorHandler } from './fastify'
import fastifyCors from '@fastify/cors'
import fastifyHelmet from '@fastify/helmet'
import routes from '../adapters/api/v1/routes'
import { swaggerConfig, swaggerUiConfig } from './documentation/swagger'
import swagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { env } from '../config/env'

export const buildServer = async (): Promise<FastifyInstance> => {
  const server = fastify({
    logger,
  })

  // register swagger documentation
  void server.register(swagger, swaggerConfig)
  void server.register(fastifySwaggerUi, swaggerUiConfig)

  // register security modules
  void server.register(fastifyCors)
  void server.register(fastifyHelmet)

  // register routes
  void server.register(routes, { prefix: '/api/v1' })

  // disable build in validation and use custom validation
  server.setValidatorCompiler(() => {
    return () => ({})
  })

  server.setSerializerCompiler(function () {
    return function (data) {
      return JSON.stringify(data)
    }
  })

  // health check
  server.get('/', async (req, resp) => {
    void resp.send({ status: 'ok' })
  })

  // register error handler
  server.setErrorHandler(fastifyErrorHandler)

  if (env.NODE_ENV === 'production') {
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
      port: process.env.PORT || env.API_PORT,
      host: env.API_HOST,
    }

    await server.listen(serverOptions)

    return server
  } catch (e) {
    console.error(e)
  }
}

process.on('unhandledRejection', (e) => {
  console.error(e)
  process.exit(1)
})
