import { type User } from '~/core/domain/entities/User'
import type IBaseRepository from './IBaseRepository'
import { type ISqlQueryFindBy } from './IBaseRepository'

export interface IUserRepository extends IBaseRepository<User> {
  findOneByEmail(email: string): Promise<User | null>
  findAll({
    limit,
    offset,
    select,
    where,
  }: ISqlQueryFindBy<User>): Promise<User[]>
}
