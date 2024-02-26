// register core di files

import { container } from 'tsyringe'
import { RedisCache } from '~/core/infrastructure/cache/RedisCache'
import { NodeEventEmitter } from '~/core/infrastructure/events/NodeEventEmitter'
import { PinoLogger } from '~/core/infrastructure/logger/PinoLogger'

/***
 * Infrastructure Services
 */
container.register<PinoLogger>('Logger', {
  useClass: PinoLogger,
})
container.register<NodeEventEmitter>('EventEmitter', {
  useClass: NodeEventEmitter,
})
container.register<RedisCache>('ApplicationKeyCache', {
  useClass: RedisCache,
})

// import all di files and export them

import * as userDi from './user'

export { userDi }