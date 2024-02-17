import { type ZodIssue } from 'zod'
import { CustomApiError } from './CustomApiError'

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
