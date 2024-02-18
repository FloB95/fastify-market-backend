import pino from 'pino'
import { env } from '~/core/config/env'

export const logger = pino({
  // redact: ["DATABASE_CONNECTION"],
  level: env.LOG_LEVEL,
  transport: {
    target: 'pino-pretty',
  },
})
