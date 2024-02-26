import { type IBaseUseCase } from '~/core/application/useCases/IBaseUseCase'
import { type User } from '~/core/domain/entities/User'

export type IdOrEmail =
  | {
      id: string
    }
  | {
      email: string
    }

export interface IGetOneUserByUseCase extends IBaseUseCase {
  execute(where: IdOrEmail): Promise<User | undefined>
}
