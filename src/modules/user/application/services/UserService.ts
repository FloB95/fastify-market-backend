import { injectable, inject } from 'tsyringe'
import { ICreateUserUseCase } from '../../domain/use_cases/ICreateUserUseCase'
import { type User } from '../../domain/entities/User'

@injectable()
export class UserService {
  constructor(
    @inject('CreateUserUseCase') private createUserUseCase: ICreateUserUseCase,
  ) {}

  async createUser(user: User): Promise<User> {
    const newUser = await this.createUserUseCase.execute(user)
    // await this.sendEmailUseCase.execute(
    //   newUser.email,
    //   'Welcome!',
    //   'Thanks for signing up!',
    // )
    return newUser
  }
}
