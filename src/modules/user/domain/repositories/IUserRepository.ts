import { type User } from '../entities/User'
import type IBaseRepository from '~/core/domain/repositories/BaseRepository'
import { type ISqlQueryFindBy } from '~/core/domain/repositories/BaseRepository'

export interface IUserRepository extends IBaseRepository<User> {
  findOneByEmail(email: string): Promise<User | null>
  findAll({
    limit,
    offset,
    select,
    where,
  }: ISqlQueryFindBy<User>): Promise<User[]>
}
