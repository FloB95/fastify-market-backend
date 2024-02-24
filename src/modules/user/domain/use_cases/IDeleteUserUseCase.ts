import { type IBaseUseCase } from '~/core/domain/use_cases/BaseUseCase'
import { type User } from '../entities/User'

export interface IDeleteUserUseCase extends IBaseUseCase {
  execute(user: User): Promise<boolean>
}
