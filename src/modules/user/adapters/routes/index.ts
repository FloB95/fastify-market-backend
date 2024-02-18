import {
  type FastifyRequest,
  type FastifyPluginCallback,
  type FastifyReply,
} from 'fastify'
import { fastifyRequestParser } from '~/core/infrastructure/fastify'
import { UserController } from '../controllers/UserController'
import {
  CreateUserSchema,
  GetUsersSchema,
} from '../../documentation/SwaggerSchemas'

const userController = new UserController()

const UserRouter: FastifyPluginCallback = (fastify, opt, done) => {
  fastify.get(
    '/',
    { schema: GetUsersSchema },
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
      schema: CreateUserSchema,
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
