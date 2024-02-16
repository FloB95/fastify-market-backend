import {
  type FastifyRequest,
  type FastifyPluginCallback,
  type FastifyReply,
} from 'fastify'
import { fastifyRequestParser } from '~/core/infrastructure/fastify'
import { UserController } from '../controllers/UserController'

const userController = new UserController()
const schemaTags = ['User']

const UserRouter: FastifyPluginCallback = (fastify, opt, done) => {
  fastify.get(
    '/',
    {
      schema: {
        tags: schemaTags,
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const res = await userController.getUsers(fastifyRequestParser(request))
      reply.statusCode = res.statusCode
      void reply.headers(res.headers)
      void reply.send(res.data)
    },
  )

  fastify.post(
    '/',
    {
      schema: {
        tags: schemaTags,
      },
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const res = await userController.createUser(fastifyRequestParser(request))
      reply.statusCode = res.statusCode
      void reply.headers(res.headers)
      void reply.send(res.data)
    },
  )

  done()
}

export default UserRouter
