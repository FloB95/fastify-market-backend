/* eslint-disable @typescript-eslint/require-await */
import { type FastifyInstance } from 'fastify'
import UserRouter from './user'

export default async function (fastify: FastifyInstance) {
  // load all routes
  void fastify.register(UserRouter, { prefix: '/users' })
}
