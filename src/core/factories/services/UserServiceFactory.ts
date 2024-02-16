import { UserService } from '~/core/application/services/UserService'
import UserRepository from '~/core/infrastructure/persistence/repositories/UserRepository'

export function createUserService() {
  const userRepository = new UserRepository()
  return new UserService(userRepository)
}
