import {
  type FastifyRequest,
  type FastifyPluginCallback,
  type FastifyReply,
} from 'fastify'
import { fastifyRequestParser } from '~/core/infrastructure/fastify/helpers'
import { container } from 'tsyringe'
import { SignInController } from '../../../controllers/auth/SignInController'
import { UserSignInSchema } from '~/core/infrastructure/swagger/auth/UserSignInSchema'

const AuthRouter: FastifyPluginCallback = (fastify, opt, done) => {
  // create user route
  fastify.post(
    '/sign-in',
    {
      schema: UserSignInSchema,
    },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const controller = container.resolve(SignInController)
      const res = await controller.handle(fastifyRequestParser(request))
      reply.statusCode = res.statusCode
      void reply.headers(res.headers)
      void reply.send(res.data)
    },
  )

  done()
}

export default AuthRouter
