import { z, type ZodIssue } from 'zod'
import { CustomApiError, DefaultApiErrorResponseSchema } from './CustomApiError'
import zodToJsonSchema from 'zod-to-json-schema'

const FieldErrorSchema = z.object({
  code: z.string(),
  expected: z.string().optional(),
  received: z.string().optional(),
  path: z.array(z.string()),
  message: z.string(),
})

export const BadRequestErrorResponseSchema = z
  .object({
    ...DefaultApiErrorResponseSchema.shape,
    code: z.number().default(400),
    fieldErrors: z.array(FieldErrorSchema).optional(),
  })
  .refine((data) => data.code === 400, {
    message: 'Error code must be 400',
    path: ['code'],
  })
  .describe('Bad Request Response. Your request has invalid fields.')
export const BadRequestErrorResponseJsonSchema = zodToJsonSchema(
  BadRequestErrorResponseSchema,
  {
    $refStrategy: 'none',
    definitions: {
      response: BadRequestErrorResponseSchema,
    },
  },
)

export class BadRequestError extends CustomApiError {
  zodErrors: ZodIssue[]
  constructor(message: string, zodErrors: ZodIssue[] = []) {
    if (zodErrors.length > 0) {
      message = `Your request has invalid fields, please fix them and try again.`
    }

    super(message, 400)

    this.zodErrors = zodErrors
  }
}
