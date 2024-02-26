import pino, { type Logger } from 'pino'
import { injectable } from 'tsyringe'
import { env } from '~/core/config/env'
import { type IBaseLogger } from '~/core/domain/logger/IBaseLogger'

@injectable()
export class PinoLogger implements IBaseLogger {
  private logger: Logger

  constructor(private logLevel: string = env.LOG_LEVEL) {
    this.logger = pino({
      // redact: ["DATABASE_CONNECTION"],
      level: logLevel,
      transport: {
        target: 'pino-pretty',
      },
    })
  }

  getLoggerInstance(): Logger {
    return this.logger
  }

  debug(message: string, obj?: object): void {
    this.logger.debug(obj, message)
  }

  info(message: string, obj?: object): void {
    this.logger.info(obj, message)
  }

  warn(message: string, obj?: object): void {
    this.logger.warn(obj, message)
  }

  error(message: string, obj?: object): void {
    this.logger.error(obj, message)
  }

  fatal(message: string, obj?: object): void {
    this.logger.fatal(obj, message)
  }
}
