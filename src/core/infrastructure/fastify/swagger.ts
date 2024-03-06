import { type FastifyDynamicSwaggerOptions } from '@fastify/swagger'
import { type FastifySwaggerUiOptions } from '@fastify/swagger-ui'
import { env } from '~/core/config/env'

/**
 * Configuration options for the Swagger UI.
 */
export const swaggerUiConfig: FastifySwaggerUiOptions = {
  routePrefix: '/api/v1/docs',
  theme: {
    title: 'Fastify API',
  },
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
    url: `${env.BASE_URL}/api/v1/swagger.json`,
  },
  uiHooks: {
    onRequest: function (request, reply, next) {
      next()
    },
    preHandler: function (request, reply, next) {
      next()
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject) => {
    return swaggerObject
  },
  transformSpecificationClone: true,
}

/**
 * Configuration options for the Swagger documentation.
 */
export const swaggerConfig: FastifyDynamicSwaggerOptions = {
  swagger: {
    info: {
      title: 'Market API Documentation',
      description:
        'Welcome to the Market API Documentation. This API provides endpoints to manage products and orders in a market.',
      version: '0.1.0',
    },
    host: env.BASE_URL.replace('http://', '').replace('https://', ''),
    schemes: ['https', 'http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'Auth', description: 'Authentication related end-points' },
      { name: 'User', description: 'User related end-points' },
      { name: 'Order', description: 'Order related end-points' },
    ],
    securityDefinitions: {
      Bearer: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description:
          'Enter the token with the `Bearer: ` prefix, e.g. "Bearer abcde12345".',
      },
    },
  },
}
