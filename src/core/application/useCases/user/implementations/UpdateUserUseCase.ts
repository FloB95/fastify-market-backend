import { inject, injectable } from 'tsyringe'
import { type IUpdateUserUseCase } from '../IUpdateUserUseCase'
import { IUserRepository } from '~/core/application/repositories/IUserRepository'
import { type User } from '~/core/domain/entities/User'
import {
  type IUpdateUserDto,
  UpdateUserDtoSchema,
} from '~/core/domain/dtos/user/IUpdateUserDto'

@injectable()
export class UpdateUserUseCase implements IUpdateUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  /**
   * Executes the UpdateUserUseCase.
   * @param {User} userToUpdate The user to update.
   * @param {IUpdateUserDto} updateUserDto The data to update the user with.
   * @returns {User} The updated user.
   */
  async execute(
    userToUpdate: User,
    updateUserDto: IUpdateUserDto,
  ): Promise<User> {
    const validatedUser: Partial<User> =
      UpdateUserDtoSchema.parse(updateUserDto)

    // validatedUser is an empty object if no fields are provided return user as is
    if (Object.keys(validatedUser).length === 0) {
      return userToUpdate
    }

    validatedUser.updatedAt = new Date()
    await this.userRepository.update(userToUpdate, validatedUser)
    const updatedUser = await this.userRepository.findOneById(userToUpdate.id)

    return updatedUser
  }
}
