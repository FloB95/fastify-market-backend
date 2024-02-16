import { CustomApiError } from "./CustomApiError";

export class BadRequestError extends CustomApiError {
  constructor(message: string) {
    super(message, 400);
  }
}
