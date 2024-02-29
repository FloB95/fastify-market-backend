import { type FastifyReply, type FastifyRequest } from 'fastify'
import { BadRequestError, CustomApiError } from '~/core/application/errors/http'
import { type IHttpRequest } from '~/core/presentation/http/interfaces/IRequest'
import { mergeZodErrorObjects } from '~/core/utils/general'

/**
 * Parses a Fastify request into an IHttpRequest object.
 * @param request The Fastify request object.
 * @returns The parsed IHttpRequest object.
 */
export const fastifyRequestParser = (request: FastifyRequest): IHttpRequest => {
  const { body, params, query, headers } = request
  return Object.freeze({ body, params, query, headers })
}

/**
 * Handles errors in Fastify routes.
 * @param error The error object.
 * @param request The Fastify request object.
 * @param reply The Fastify reply object.
 */
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
      const mergedErrors = mergeZodErrorObjects(zodErrors)
      responsePayload.fieldErrors = mergedErrors
    }

    return reply.status(error.statusCode).send(responsePayload)
  }

  return reply.status(500).send({
    message: error.message,
    code: 500,
  })
}
