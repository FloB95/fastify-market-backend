import { type IBaseUseCase } from '~/core/application/useCases/IBaseUseCase'
import { type ICreateUserDto } from '~/core/domain/dtos/user/ICreateUserDto'
import { type User } from '~/core/domain/entities/User'

export interface ICreateUserUseCase extends IBaseUseCase {
  execute(user: ICreateUserDto): Promise<User>
}
