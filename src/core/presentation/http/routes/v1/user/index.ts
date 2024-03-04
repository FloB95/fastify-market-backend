import {
  type FastifyRequest,
  type FastifyPluginCallback,
  type FastifyReply,
} from 'fastify'
import { fastifyRequestParser } from '~/core/infrastructure/fastify/helpers'
import { GetUsersSchema } from '~/core/infrastructure/swagger/user/GetUsersSchema'
import { GetUserController } from '../../../controllers/user/GetUserController'
import { container } from 'tsyringe'
import { GetUsersController } from '../../../controllers/user/GetUsersController'
import { CreateUserSchema } from '~/core/infrastructure/swagger/user/CreateUserSchema'
import { CreateUserController } from '../../../controllers/user/CreateUserController'
import { GetUserSchema } from '~/core/infrastructure/swagger/user/GetUserSchema'
import { UpdateUserSchema } from '~/core/infrastructure/swagger/user/UpdateUserSchema'
import { UpdateUserController } from '../../../controllers/user/UpdateUserController'
import { DeleteUserSchema } from '~/core/infrastructure/swagger/user/DeleteUserSchema'
import { DeleteUserController } from '../../../controllers/user/DeleteUserController'
import UserRepository from '~/core/infrastructure/repositories/drizzle/UserRepository'
import { ROLES } from '~/core/domain/enums/Roles'

const UserRouter: FastifyPluginCallback = (fastify, opt, done) => {
  // roles that have access to the user routes
  const DEFAULT_USER_ACCESS_ROLES = [
    ROLES.SUPER_ADMIN,
    ROLES['users:maintainer'],
  ]

  // get all users route
  fastify.get(
    '/',
    {
      schema: GetUsersSchema,
      preHandler: [
        fastify.guard.role(
          ...DEFAULT_USER_ACCESS_ROLES,
          ROLES.APPLICATION_USER,
        ),
      ],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const controller = container.resolve(GetUsersController)
      const res = await controller.handle(fastifyRequestParser(request))
      reply.statusCode = res.statusCode
      void reply.headers(res.headers)
      void reply.send(res.data)
    },
  )

  // performance test route
  fastify.get('/test', async (request: FastifyRequest, reply: FastifyReply) => {
    const r = container.resolve(UserRepository)
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
      preHandler: [
        fastify.guard.role(...DEFAULT_USER_ACCESS_ROLES, ROLES['users:write']),
      ],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const controller = container.resolve(CreateUserController)
      const res = await controller.handle(fastifyRequestParser(request))
      reply.statusCode = res.statusCode
      void reply.headers(res.headers)
      void reply.send(res.data)
    },
  )

  // get singe user ny id
  fastify.get(
    '/:id',
    {
      schema: GetUserSchema,
      preHandler: [
        fastify.guard.role(
          ...DEFAULT_USER_ACCESS_ROLES,
          ROLES.APPLICATION_USER,
        ),
      ],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const controller = container.resolve(GetUserController)
      const res = await controller.handle(fastifyRequestParser(request))
      reply.statusCode = res.statusCode
      void reply.headers(res.headers)
      void reply.send(res.data)
    },
  )

  // update user route
  // access control is handled by the controller
  fastify.patch(
    '/:id',
    {
      schema: UpdateUserSchema,
      preHandler: [
        fastify.guard.role(
          ...DEFAULT_USER_ACCESS_ROLES,
          ROLES.APPLICATION_USER,
        ),
      ],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const controller = container.resolve(UpdateUserController)
      const res = await controller.handle(fastifyRequestParser(request))
      reply.statusCode = res.statusCode
      void reply.headers(res.headers)
      void reply.send(res.data)
    },
  )

  // delete user route
  fastify.delete(
    '/:id',
    {
      schema: DeleteUserSchema,
      preHandler: [
        fastify.guard.role(...DEFAULT_USER_ACCESS_ROLES, ROLES['users:delete']),
      ],
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const controller = container.resolve(DeleteUserController)
      const res = await controller.handle(fastifyRequestParser(request))
      reply.statusCode = res.statusCode
      void reply.headers(res.headers)
      void reply.send(res.data)
    },
  )

  done()
}

export default UserRouter
