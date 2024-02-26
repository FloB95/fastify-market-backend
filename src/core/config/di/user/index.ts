import { container } from 'tsyringe'
import { CreateUserUseCase } from '~/core/application/useCases/user/implementations/CreateUser'
import { DeleteUserUseCase } from '~/core/application/useCases/user/implementations/DeleteUser'
import { GetOneUserByUseCase } from '~/core/application/useCases/user/implementations/GetOneUserBy'
import { GetUsersUseCase } from '~/core/application/useCases/user/implementations/GetUsers'
import { UpdateUserUseCase } from '~/core/application/useCases/user/implementations/UpdateUser'
import UserRepository from '~/core/infrastructure/repositories/drizzle/UserRepository'
import { CreateUserController } from '~/core/presentation/http/controllers/user/CreateUserController'
import { DeleteUserController } from '~/core/presentation/http/controllers/user/DeleteUserController'
import { GetUserController } from '~/core/presentation/http/controllers/user/GetUserController'
import { GetUsersController } from '~/core/presentation/http/controllers/user/GetUsersController'
import { UpdateUserController } from '~/core/presentation/http/controllers/user/UpdateUserController'

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

/**
 * Repositories
 */
container.register('UserRepository', {
  useClass: UserRepository,
})

/**
 * Controllers
 */
container.register<CreateUserController>('CreateUserController', {
  useClass: CreateUserController,
})
container.register<UpdateUserController>('UpdateUserController', {
  useClass: UpdateUserController,
})
container.register<DeleteUserController>('DeleteUserController', {
  useClass: DeleteUserController,
})
container.register<GetUserController>('GetUserController', {
  useClass: GetUserController,
})
container.register<GetUsersController>('GetUsersController', {
  useClass: GetUsersController,
})
