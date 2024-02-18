import { type FastifySchema } from 'fastify'

export interface ExtendedFastifySchema extends FastifySchema {
  hide?: boolean
  validate?: boolean
  deprecated?: boolean
  tags?: readonly string[]
  description?: string
  summary?: string
  consumes?: readonly string[]
  produces?: readonly string[]
  security?: ReadonlyArray<{ [securityLabel: string]: readonly string[] }>
}
