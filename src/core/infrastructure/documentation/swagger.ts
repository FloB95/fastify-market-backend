import { type FastifySwaggerUiOptions } from '@fastify/swagger-ui'

export const swaggerDocumentation: FastifySwaggerUiOptions = {
  routePrefix: '/api/v1/docs',
  theme: {
    title: 'Fastify API',
  },
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
    url: 'http://localhost:5000/api/v1/swagger.json',
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
