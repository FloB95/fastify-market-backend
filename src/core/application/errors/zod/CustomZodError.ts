import { ZodError, type ZodIssue } from 'zod'

export class CustomZodError extends ZodError {
  constructor(message: string, path: string[]) {
    const issue: ZodIssue = {
      code: 'custom',
      message,
      path,
    }

    super([issue])
  }
}
