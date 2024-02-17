import { type FastifyReply, type FastifyRequest } from 'fastify'
import { BadRequestError, CustomApiError } from '../../errors/http'
import { type IHttpRequest } from '~/core/interfaces/http/Request'

export const fastifyRequestParser = (request: FastifyRequest): IHttpRequest => {
  const { body, params, query, headers } = request
  return Object.freeze({ body, params, query, headers })
}

export const fastifyErrorHandler = (
  error: Error,
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  if (error instanceof CustomApiError) {
    // if error is instance of BadRequestError attach zod errors
    const zodErrors = error instanceof BadRequestError ? error.zodErrors : []

    const responsePayload: any = {
      message: error.message,
      code: error.statusCode,
    }

    if (zodErrors.length > 0) {
      responsePayload.fieldErrors = zodErrors
    }

    return reply.status(error.statusCode).send(responsePayload)
  }

  return reply.status(500).send({
    message: error.message,
    code: 500,
  })
}
