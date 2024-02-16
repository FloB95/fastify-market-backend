import { User } from '~/core/domain/entities/User'
import { type IUserRepository } from '~/core/domain/interfaces/repositories/UserRepository'
import { sleep } from '~/core/utils/general'

export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async create(): Promise<User> {
    await sleep(1)

    const user = new User()
    return user
  }
}
