import { type FastifyReply, type FastifyRequest } from 'fastify'
import { BadRequestError, CustomApiError } from '../../errors/http'
import { type IHttpRequest } from '~/core/domain/http/Request'

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
      const mergedErrors = mergeErrorObjects(zodErrors)
      responsePayload.fieldErrors = mergedErrors
    }

    return reply.status(error.statusCode).send(responsePayload)
  }

  return reply.status(500).send({
    message: error.message,
    code: 500,
  })
}

function mergeErrorObjects(errors: any[]): any[] {
  const mergedErrors = []

  for (const error of errors) {
    const existingError = mergedErrors.find((e) => {
      const keys = Object.keys(e)
      return keys.every((key) => key === 'path' || e[key] === error[key])
    })

    if (existingError) {
      existingError.path = [...existingError.path, ...error.path]
    } else {
      mergedErrors.push(error)
    }
  }

  return mergedErrors
}
