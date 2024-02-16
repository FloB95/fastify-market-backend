import { injectable, inject } from 'tsyringe'
import { ICreateUserUseCase } from '../../domain/use_cases/ICreateUserUseCase'
import { User } from '../../domain/entities/User'
import { type ICreateUserDto } from '../dtos/UserCreateDto'
import { v4 as uuidv4 } from 'uuid'
import { IGetUsersUseCase } from '../../domain/use_cases/IGetUsersUseCase'

@injectable()
export class UserService {
  constructor(
    @inject('CreateUserUseCase') private createUserUseCase: ICreateUserUseCase,
    @inject('GetUsersUseCase') private getUsersUseCase: IGetUsersUseCase,
  ) {}

  async createUser(userDto: ICreateUserDto): Promise<User> {
    const user = new User(
      uuidv4(), // generate a uuid
      userDto.firstname,
      userDto.lastname,
      userDto.email,
      userDto.password,
    )
    const newUser = await this.createUserUseCase.execute(user)

    // todo implement email service
    // await this.sendEmailUseCase.execute(
    //   newUser.email,
    //   'Welcome!',
    //   'Thanks for signing up!',
    // )
    return newUser
  }

  async getUsers(page: number, limit: number): Promise<User[]> {
    return this.getUsersUseCase.execute(page, limit)
  }
}
