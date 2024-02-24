import { type IBaseUseCase } from '~/core/domain/use_cases/BaseUseCase'
import { type User } from '../entities/User'

export interface IUpdateUserUseCase extends IBaseUseCase {
  execute(userToUpdate: User, updates: Partial<User>): Promise<User>
}
