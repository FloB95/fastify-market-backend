import {
  type FastifyRequest,
  type FastifyPluginCallback,
  type FastifyReply,
} from 'fastify'
import { fastifyRequestParser } from '~/core/infrastructure/fastify'
import { UserController } from '../controllers/UserController'

const userController = new UserController()

const UserRouter: FastifyPluginCallback = (fastify, opt, done) => {
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    const res = await userController.createUser(fastifyRequestParser(request))
    reply.statusCode = res.statusCode
    void reply.headers(res.headers)
    void reply.send(res.data)
  })

  done()
}

export default UserRouter
