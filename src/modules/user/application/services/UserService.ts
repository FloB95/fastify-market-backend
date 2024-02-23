import { injectable, inject } from 'tsyringe'
import { ICreateUserUseCase } from '../../domain/use_cases/ICreateUserUseCase'
import { type User } from '../../domain/entities/User'
import {
  CreateUserDtoSchema,
  type IUpdateUserDto,
  type ICreateUserDto,
  UpdateUserDtoSchema,
} from '../dtos/UserCreateDto'
import { IGetUsersUseCase } from '../../domain/use_cases/IGetUsersUseCase'
import { IGetOneUserByUseCase } from '../../domain/use_cases/IGetUserByUseCase'
import { CustomZodError } from '~/core/errors/zod/CustomZodError'
import { IUpdateUserUseCase } from '../../domain/use_cases/IUpdateUserUseCase'
import { IDeleteUserUseCase } from '../../domain/use_cases/IDeleteUserUseCase'

@injectable()
export class UserService {
  constructor(
    @inject('CreateUserUseCase') private createUserUseCase: ICreateUserUseCase,
    @inject('GetUsersUseCase') private getUsersUseCase: IGetUsersUseCase,
    @inject('GetOneUserByUseCase')
    private getOneUserByUseCase: IGetOneUserByUseCase,
    @inject('UpdateUserUseCase') private updateUserUseCase: IUpdateUserUseCase,
    @inject('DeleteUserUseCase') private deleteUserUseCase: IDeleteUserUseCase,
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
    select?: object,
    whereString?: any,
  ): Promise<{
    users: User[]
    total: number
  }> {
    const where = whereString ? JSON.parse(whereString) : undefined

    return await this.getUsersUseCase.execute({
      limit,
      offset: page,
      select,
      where,
    })
  }

  async getUserById(id: string): Promise<User | undefined> {
    return await this.getOneUserByUseCase.execute({ id })
  }

  async updateUser(userToUpdate: User, userDto: IUpdateUserDto): Promise<User> {
    const validatedUser = UpdateUserDtoSchema.parse(userDto)

    // validatedUser is an empty object if no fields are provided return user as is
    if (Object.keys(validatedUser).length === 0) {
      return userToUpdate
    }

    return await this.updateUserUseCase.execute(userToUpdate, validatedUser)
  }

  async deleteUser(userToDelete: User): Promise<boolean> {
    return await this.deleteUserUseCase.execute(userToDelete)
  }
}
