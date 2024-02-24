import { type IBaseUseCase } from '~/core/domain/use_cases/BaseUseCase'
import { type User } from '../entities/User'

type IdOrEmail =
  | {
      id: string
    }
  | {
      email: string
    }

export interface IGetOneUserByUseCase extends IBaseUseCase {
  execute(where: IdOrEmail): Promise<User>
}
