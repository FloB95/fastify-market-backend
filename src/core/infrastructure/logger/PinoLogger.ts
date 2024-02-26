import pino, { type Logger } from 'pino'
import { injectable, singleton } from 'tsyringe'
import { env } from '~/core/config/env'
import { type IBaseLogger } from '~/core/domain/logger/IBaseLogger'

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
