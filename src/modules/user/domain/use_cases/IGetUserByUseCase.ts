import { type User } from '../entities/User'

type IdOrEmail =
  | {
      id: string
    }
  | {
      email: string
    }

export interface IGetOneUserByUseCase {
  execute(where: IdOrEmail): Promise<User>
}
