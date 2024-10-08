import fastify, { type FastifyInstance } from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyHelmet from '@fastify/helmet'
import swagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { swaggerConfig, swaggerUiConfig } from './swagger'
import routes from '~/core/presentation/http/routes/v1'
import { fastifyErrorHandler } from './helpers'
import { logger } from '../services/logger'
import { env } from '~/core/config/env'
import fastifyGuard from 'fastify-guard'
import {
  UnauthenticatedError,
  UnauthorizedError,
} from '~/core/application/errors/http'
import { container } from 'tsyringe'
import { type IJwtService } from '~/core/application/services/IJwtService'
import { type IUserResponseDto } from '~/core/domain/dtos/user/IUserResponseDto'
import { API_BASE_PATH } from '~/core/config/constants'

/**
 * Builds a Fastify server instance with the specified configurations.
 * @returns A promise that resolves to a FastifyInstance.
 */
export const buildServer = async (): Promise<FastifyInstance> => {
  const server = fastify({
    logger: false,
  })

  // register swagger documentation
  void server.register(swagger, swaggerConfig)
  void server.register(fastifySwaggerUi, swaggerUiConfig)

  // register security modules
  void server.register(fastifyCors)
  void server.register(fastifyHelmet)

  // add user property to request
  server.decorateRequest('user', null)
  server.addHook('onRequest', function (request, _reply, done) {
    const authHeader = request.headers.authorization

    if (!authHeader) {
      done()
      return
    }

    try {
      const token = authHeader.replace('Bearer ', '')
      const JwtService = container.resolve<IJwtService>('JwtService')
      const decoded = JwtService.verifyToken(token) as IUserResponseDto
      request.user = decoded
    } catch (e) {}
    done()
  })

  // register guard to protect routes
  void server.register(fastifyGuard, {
    requestProperty: 'user',
    roleProperty: 'roles',
    errorHandler: (result, req, reply) => {
      const error = req?.user
        ? new UnauthorizedError(
            "you don't have permission to access this route",
          )
        : new UnauthenticatedError(
            'you need to be authenticated to access this route',
          )

      // ip from user not cloudflare
      const ip = req.headers['cf-connecting-ip'] || req.ip
      logger.warn(
        `Auth error for route ${req.routeOptions.url}. Message: ${error.message}. IP: ${ip}`,
      )

      reply.statusCode = error.statusCode
      void reply.headers({ 'Content-Type': 'application/json' })
      return reply.send({ message: error.message, code: error.statusCode })
    },
  })

  // register routes
  void server.register(routes, { prefix: API_BASE_PATH })

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

  return server
}

/**
 * Starts the Fastify server.
 */
export const startServer = async () => {
  try {
    const server = await buildServer()

    await server.ready()
    server.swagger()

    const serverOptions: any = {
      port: process.env.PORT || env.API_PORT,
      host: env.API_HOST,
    }

    await server.listen(serverOptions)

    console.log(
      'Server is running under url http://%s:%s',
      serverOptions.host,
      serverOptions.port,
    )

    return server
  } catch (e) {
    console.error(e)
  }
}

process.on('unhandledRejection', (e) => {
  console.error(e)
  process.exit(1)
})
