import { injectable, inject } from 'tsyringe'
import { ICreateUserUseCase } from '../../domain/use_cases/ICreateUserUseCase'
import { type User } from '../../domain/entities/User'
import { CreateUserDtoSchema, type ICreateUserDto } from '../dtos/UserCreateDto'
import { IGetUsersUseCase } from '../../domain/use_cases/IGetUsersUseCase'
import { IGetOneUserByUseCase } from '../../domain/use_cases/IGetUserByUseCase'
import { CustomZodError } from '~/core/errors/zod/CustomZodError'

@injectable()
export class UserService {
  constructor(
    @inject('CreateUserUseCase') private createUserUseCase: ICreateUserUseCase,
    @inject('GetUsersUseCase') private getUsersUseCase: IGetUsersUseCase,
    @inject('GetOneUserByUseCase')
    private getOneUserByUseCase: IGetOneUserByUseCase,
  ) {}

  async createUser(userDto: ICreateUserDto): Promise<User> {
    // Validate the user input using the User schema
    const validatedUser = CreateUserDtoSchema.parse(userDto)

    // Check if a user with the same email already exists
    const userWithMail = await this.getOneUserByUseCase.execute({
      email: validatedUser.email,
    })

    // If a user with the same email exists, throw an error
    if (userWithMail) {
      throw new CustomZodError('User with this email already exists', ['email'])
    }

    // Pass the validated user DTO to the CreateUserUseCase
    const newUser = await this.createUserUseCase.execute(validatedUser)

    return newUser
  }

  async getUsers(
    page: number,
    limit: number,
  ): Promise<{
    users: User[]
    total: number
  }> {
    return await this.getUsersUseCase.execute(page, limit)
  }
}
