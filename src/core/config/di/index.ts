// register core di files

import { container } from 'tsyringe'
import { RedisCache } from '~/core/infrastructure/cache/RedisCache'
import { NodeEventEmitter } from '~/core/infrastructure/events/NodeEventEmitter'
import { PinoLogger } from '~/core/infrastructure/logger/PinoLogger'

/***
 * Infrastructure Services
 */
container.registerSingleton<PinoLogger>('Logger', PinoLogger)
container.registerSingleton<NodeEventEmitter>('EventEmitter', NodeEventEmitter)
container.registerSingleton<RedisCache>('ApplicationKeyCache', RedisCache)

// import all di files and export them

import * as userDi from './user'

export { userDi }
