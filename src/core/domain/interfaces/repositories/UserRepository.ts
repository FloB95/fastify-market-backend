import { type User } from '~/core/domain/entities/User'
import type IBaseRepository from './BaseRepository'

export interface IUserRepository extends IBaseRepository<User> {}
