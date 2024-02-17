import { container } from 'tsyringe'
import { CreateUserUseCase } from './infrastructure/use_cases/CreateUser'
import { UserService } from './application/services/UserService'
import { GetUsersUseCase } from './infrastructure/use_cases/GetUsers'
import UserRepository from './adapters/repositories/UserRepository'

/***
 * Use Cases
 */
container.register<CreateUserUseCase>('CreateUserUseCase', {
  useClass: CreateUserUseCase,
})

container.register<GetUsersUseCase>('GetUsersUseCase', {
  useClass: GetUsersUseCase,
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
