import pino from 'pino'

export const logger = pino({
  // redact: ["DATABASE_CONNECTION"],
  level: 'error',
  transport: {
    target: 'pino-pretty',
  },
})
