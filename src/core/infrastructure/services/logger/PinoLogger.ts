import pino, { type Logger } from 'pino'
import { injectable, singleton } from 'tsyringe'
import { env } from '~/core/config/env'
import { type IBaseLogger } from '~/core/domain/logger/IBaseLogger'

/**
 * Implementation of the IBaseLogger interface using Pino.
 */
@injectable()
@singleton()
export class PinoLogger implements IBaseLogger {
  private logger: Logger

  constructor() {
    this.logger = pino({
      // redact: ["DATABASE_CONNECTION"],
      level: env.LOG_LEVEL,
      transport: {
        target: 'pino-pretty',
      },
    })
  }

  /**
   * Get the underlying Pino logger instance.
   * @returns The Pino logger instance.
   */
  getLoggerInstance(): Logger {
    return this.logger
  }

  /**
   * Log a debug message.
   * @param message The message to log.
   * @param obj Additional data to log.
   */
  debug(message: string, obj?: object): void {
    this.logger.debug(obj, message)
  }

  /**
   * Log an info message.
   * @param message The message to log.
   * @param obj Additional data to log.
   */
  info(message: string, obj?: object): void {
    this.logger.info(obj, message)
  }

  /**
   * Log a warning message.
   * @param message The message to log.
   * @param obj Additional data to log.
   */
  warn(message: string, obj?: object): void {
    this.logger.warn(obj, message)
  }

  /**
   * Log an error message.
   * @param message The message to log.
   * @param obj Additional data to log.
   */
  error(message: string, obj?: object): void {
    this.logger.error(obj, message)
  }

  /**
   * Log a fatal message.
   * @param message The message to log.
   * @param obj Additional data to log.
   */
  fatal(message: string, obj?: object): void {
    this.logger.fatal(obj, message)
  }
}
