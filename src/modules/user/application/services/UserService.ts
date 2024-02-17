import { injectable, inject } from 'tsyringe'
import { ICreateUserUseCase } from '../../domain/use_cases/ICreateUserUseCase'
import { type User } from '../../domain/entities/User'
import { CreateUserDtoSchema, type ICreateUserDto } from '../dtos/UserCreateDto'
import { IGetUsersUseCase } from '../../domain/use_cases/IGetUsersUseCase'

@injectable()
export class UserService {
  constructor(
    @inject('CreateUserUseCase') private createUserUseCase: ICreateUserUseCase,
    @inject('GetUsersUseCase') private getUsersUseCase: IGetUsersUseCase,
  ) {}

  async createUser(userDto: ICreateUserDto): Promise<User> {
    // Validate the user input using the User schema
    const validatedUser = CreateUserDtoSchema.parse(userDto)

    // Pass the validated user DTO to the CreateUserUseCase
    const newUser = await this.createUserUseCase.execute(validatedUser)

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
