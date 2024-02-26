import { type IBaseUseCase } from '~/core/application/useCases/IBaseUseCase'
import { type User } from '~/core/domain/entities/User'

export interface IUpdateUserUseCase extends IBaseUseCase {
  execute(userToUpdate: User, updates: Partial<User>): Promise<User>
}
