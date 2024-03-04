import { inject, injectable } from 'tsyringe'
import { type ICreateUserUseCase } from '../ICreateUserUseCase'
import { IUserRepository } from '~/core/application/repositories/IUserRepository'
import { User } from '~/core/domain/entities/User'
import {
  CreateUserDtoSchema,
  type ICreateUserDto,
} from '~/core/domain/dtos/user/ICreateUserDto'
import { CustomZodError } from '~/core/application/errors/zod/CustomZodError'
import { IEventEmitter } from '~/core/domain/events/IEventEmitter'
import { UserCreatedEvent } from '~/core/domain/events/user/UserCreatedEvent'
import { IPasswordService } from '~/core/application/services/IPasswordService'

@injectable()
export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('EventEmitter') private eventEmitter: IEventEmitter,
    @inject('PasswordService') private passwordService: IPasswordService,
  ) {}

  /**
   * Executes the CreateUserUseCase.
   * @param userDto The user data to create a new user.
   * @returns The created user.
   */
  async execute(userDto: ICreateUserDto): Promise<User> {
    // Validate the user input using the User schema
    const validatedUser = CreateUserDtoSchema.parse(userDto)

    // Check if a user with the same email already exists
    const userWithMail = await this.userRepository.findOneByEmail(
      validatedUser.email,
    )

    // If a user with the same email exists, throw an error
    if (userWithMail) {
      throw new CustomZodError('User with this email already exists', ['email'])
    }

    // hash the user's password
    const hashedPassword = await this.passwordService.hashPassword(
      validatedUser.password,
    )

    // create a new user entity
    const newUser = new User(
      await this.userRepository.generateId(),
      validatedUser.firstname,
      validatedUser.lastname,
      validatedUser.email,
      hashedPassword,
      validatedUser.roles,
    )

    // create the user
    await this.userRepository.create(newUser)

    // get the created user from the repository
    const createdUser = await this.userRepository.findOneById(newUser.id)

    // emit events
    const userCreatedEvent = new UserCreatedEvent(createdUser)
    this.eventEmitter.emit(userCreatedEvent)

    // return created user
    return createdUser
  }
}
