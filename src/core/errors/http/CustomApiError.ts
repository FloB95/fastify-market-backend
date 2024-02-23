import { z } from 'zod'

export const DefaultApiErrorResponseSchema = z.object({
  message: z.string(),
})

export class CustomApiError extends Error {
  statusCode: number

  constructor(message: string, code: number) {
    super(message)
    this.statusCode = code
  }
}
