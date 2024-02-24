import {
  type FastifyRequest,
  type FastifyPluginCallback,
  type FastifyReply,
} from 'fastify'
import { fastifyRequestParser } from '~/core/infrastructure/fastify'
import { UserController } from '../controllers/UserController'
import {
  CreateUserSchema,
  DeleteUserSchema,
  GetUserSchema,
  GetUsersSchema,
  UpdateUserSchema,
} from '../../documentation/SwaggerSchemas'
import UserRepository from '../repositories/DrizzleDbUserRepository'

const userController = new UserController()

const UserRouter: FastifyPluginCallback = (fastify, opt, done) => {
  //
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

  fastify.get('/test', async (request: FastifyRequest, reply: FastifyReply) => {
    const r = new UserRepository()
    const users = await r.findAll({
      limit: 10,
      offset: 0,
    })
    void reply.send(users)
  })

  // create user route
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

  // get singe user ny id
  fastify.get(
    '/:id',
    { schema: GetUserSchema },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const res = await userController.getUser(fastifyRequestParser(request))
      reply.statusCode = res.statusCode
      void reply.headers(res.headers)
      void reply.send(res.data)
    },
  )

  // update user route
  fastify.patch(
    '/:id',
    { schema: UpdateUserSchema },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const res = await userController.updateUser(fastifyRequestParser(request))
      reply.statusCode = res.statusCode
      void reply.headers(res.headers)
      void reply.send(res.data)
    },
  )

  // delete user route
  fastify.delete(
    '/:id',
    { schema: DeleteUserSchema },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const res = await userController.deleteUser(fastifyRequestParser(request))
      reply.statusCode = res.statusCode
      void reply.headers(res.headers)
      void reply.send(res.data)
    },
  )

  done()
}

export default UserRouter
