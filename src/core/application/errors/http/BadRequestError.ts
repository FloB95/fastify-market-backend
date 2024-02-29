import { type ZodIssue } from 'zod'
import { CustomApiError } from './CustomApiError'

/**
 * Represents a BadRequestError, which is an extension of CustomApiError.
 */
export class BadRequestError extends CustomApiError {
  /**
   * An array of ZodIssue objects representing the validation errors.
   */
  zodErrors: ZodIssue[]

  /**
   * Creates an instance of BadRequestError.
   * @param message The error message.
   * @param zodErrors An array of ZodIssue objects representing the validation errors.
   */
  constructor(message: string, zodErrors: ZodIssue[] = []) {
    if (zodErrors.length > 0) {
      message = `Your request has invalid fields, please fix them and try again.`
    }

    super(message, 400)

    this.zodErrors = zodErrors
  }
}
