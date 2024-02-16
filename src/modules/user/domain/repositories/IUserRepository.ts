import type IBaseRepository from '~/core/interfaces/repositories/BaseRepository'
import { type User } from '../entities/User'

export interface IUserRepository extends IBaseRepository<User> {}
