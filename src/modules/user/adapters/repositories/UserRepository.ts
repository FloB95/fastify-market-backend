/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/require-await */
import { type IPaginationResult } from '~/core/interfaces/repositories/BaseRepository'
import { type IUserRepository } from '../../domain/repositories/IUserRepository'
import { type User } from '../../domain/entities/User'

class UserRepository implements IUserRepository {
  async findAll(max: number): Promise<User[]> {
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
