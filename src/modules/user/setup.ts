import { container } from 'tsyringe'
import { CreateUserUseCase } from './infrastructure/use_cases/CreateUser'
import { UserService } from './application/services/UserService'
import { GetUsersUseCase } from './infrastructure/use_cases/GetUsers'
import UserRepository from './adapters/repositories/DrizzleDbUserRepository'
import { GetOneUserByUseCase } from './infrastructure/use_cases/GetOneUserBy'
import { UpdateUserUseCase } from './infrastructure/use_cases/UpdateUser'
import { DeleteUserUseCase } from './infrastructure/use_cases/DeleteUser'

/***
 * Use Cases
 */
container.register<CreateUserUseCase>('CreateUserUseCase', {
  useClass: CreateUserUseCase,
})
container.register<UpdateUserUseCase>('UpdateUserUseCase', {
  useClass: UpdateUserUseCase,
})
container.register<GetUsersUseCase>('GetUsersUseCase', {
  useClass: GetUsersUseCase,
})
container.register<GetOneUserByUseCase>('GetOneUserByUseCase', {
  useClass: GetOneUserByUseCase,
})
container.register<DeleteUserUseCase>('DeleteUserUseCase', {
  useClass: DeleteUserUseCase,
})

/***
 * Services
 */
container.register<UserService>('UserService', {
  useClass: UserService,
})

/**
 * Repositories
 */
container.register('UserRepository', {
  useClass: UserRepository,
})
