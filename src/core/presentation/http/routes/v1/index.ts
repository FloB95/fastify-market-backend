import { type FastifyInstance } from 'fastify'
import UserRouter from './user'
import AuthRouter from './auth'

export default async function (fastify: FastifyInstance) {
  // load all routes
  void fastify.register(UserRouter, { prefix: '/users' })
  void fastify.register(AuthRouter, { prefix: '/auth' })
}
