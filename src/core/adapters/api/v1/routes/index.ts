/* eslint-disable @typescript-eslint/require-await */
import { type FastifyInstance } from 'fastify'
import UserRouter from '~/modules/user/adapters/routes'

export default async function (fastify: FastifyInstance) {
  // load all routes
  void fastify.register(UserRouter, { prefix: '/users' })
}
