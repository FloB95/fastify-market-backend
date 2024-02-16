import { UserController } from '~/core/infrastructure/web/controllers/UserController'
import { createUserService } from '../services/UserServiceFactory'

export function createUserController(): UserController {
  const userService = createUserService() // This is the dependency

  return new UserController(userService)
}
