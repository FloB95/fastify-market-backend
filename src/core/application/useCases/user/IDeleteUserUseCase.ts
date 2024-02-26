import { type IBaseUseCase } from '~/core/application/useCases/IBaseUseCase'
import { type User } from '~/core/domain/entities/User'

export interface IDeleteUserUseCase extends IBaseUseCase {
  execute(user: User): Promise<boolean>
}
