/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */
import { type User } from '~/core/domain/entities/User'
import { type IUserRepository } from '~/core/domain/interfaces/repositories/UserRepository'

class UserRepository implements IUserRepository {
  async findAll(): Promise<User[]> {
    throw new Error('Method not implemented.')
  }

  async findById(id: string): Promise<User | undefined> {
    throw new Error('Method not implemented.')
  }

  async update(item: User): Promise<User> {
    throw new Error('Method not implemented.')
  }

  async delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  async create(post: User): Promise<User> {
    throw new Error('Method not implemented.')
  }
}

export default UserRepository
