import { container } from 'tsyringe'
import { CreateUserUseCase } from './infrastructure/use_cases/CreateUser'
import { UserService } from './application/services/UserService'

// register all dependencies
container.register<CreateUserUseCase>('CreateUserUseCase', {
  useClass: CreateUserUseCase,
})

container.register<UserService>('UserService', {
  useClass: UserService,
})
