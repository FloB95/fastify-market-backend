// register core di files

import { container } from 'tsyringe'
import { RedisCache } from '~/core/infrastructure/services/cache/RedisCache'
import { NodeEventEmitter } from '~/core/infrastructure/services/events/NodeEventEmitter'
import { PinoLogger } from '~/core/infrastructure/services/logger/PinoLogger'

/***
 * Infrastructure Services
 */
container.registerSingleton<PinoLogger>('Logger', PinoLogger)
container.registerSingleton<NodeEventEmitter>('EventEmitter', NodeEventEmitter)
container.registerSingleton<RedisCache>('ApplicationKeyCache', RedisCache)

// import all di files and export them

import * as authDi from './auth'
import * as userDi from './user'

export { authDi, userDi }
