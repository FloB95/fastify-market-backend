import { type IBaseUseCase } from '~/core/domain/use_cases/BaseUseCase'
import { type TUser, type User } from '../entities/User'

export interface ICreateUserUseCase extends IBaseUseCase {
  execute(user: TUser): Promise<User>
}
