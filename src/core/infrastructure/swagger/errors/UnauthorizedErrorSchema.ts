import { z } from 'zod'
import zodToJsonSchema from 'zod-to-json-schema'
import { DefaultApiErrorResponseSchema } from './DefaultErrorSchema'

export const UnauthorizedErrorResponseSchema = z
  .object({
    ...DefaultApiErrorResponseSchema.shape,
    code: z.number().default(403),
  })
  .refine((data) => data.code === 403, {
    message: 'Error code must be 403',
    path: ['code'],
  })
  .describe('Unauthorized Response. The request was not authorized.')

export const UnauthorizedErrorResponseJsonSchema = zodToJsonSchema(
  UnauthorizedErrorResponseSchema,
  {
    $refStrategy: 'none',
    definitions: {
      response: UnauthorizedErrorResponseSchema,
    },
  },
)
