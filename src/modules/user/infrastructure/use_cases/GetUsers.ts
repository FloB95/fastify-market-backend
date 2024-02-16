/* eslint-disable @typescript-eslint/no-unused-vars */
import { injectable } from 'tsyringe'
import { sleep } from '~/core/utils/general'
import { type User } from '../../domain/entities/User'
import { type IGetUsersUseCase } from '../../domain/use_cases/IGetUsersUseCase'

@injectable()
export class GetUsersUseCase implements IGetUsersUseCase {
  private users: User[] = []

  constructor() {}

  async execute(page: number, limit: number): Promise<User[]> {
    await sleep(1)
    return this.users
  }
}
