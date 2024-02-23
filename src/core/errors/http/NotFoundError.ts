import { z } from 'zod'
import { CustomApiError, DefaultApiErrorResponseSchema } from './CustomApiError'
import zodToJsonSchema from 'zod-to-json-schema'

export const NotFoundErrorResponseSchema = z
  .object({
    ...DefaultApiErrorResponseSchema.shape,
    code: z.number().default(404),
  })
  .refine((data) => data.code === 404, {
    message: 'Error code must be 404',
    path: ['code'],
  })
  .describe('Not Found Response. The requested resource was not found')

export const NotFoundErrorResponseJsonSchema = zodToJsonSchema(
  NotFoundErrorResponseSchema,
  {
    $refStrategy: 'none',
    definitions: {
      response: NotFoundErrorResponseSchema,
    },
  },
)

export class NotFoundError extends CustomApiError {
  constructor(message: string) {
    super(message, 404)
  }
}
