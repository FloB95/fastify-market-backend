import { container } from 'tsyringe'
import { AuthenticateUserUseCase } from '~/core/application/useCases/auth/implementations/AuthenticateUserUseCase'
import { CreateRefreshTokenUseCase } from '~/core/application/useCases/auth/implementations/CreateRefreshTokenUseCase'
import { RefreshAuthTokenUseCase } from '~/core/application/useCases/auth/implementations/RefreshAuthTokenUseCase'
import RefreshTokenRepository from '~/core/infrastructure/repositories/drizzle/RefreshTokenRepository'
import { JwtService } from '~/core/infrastructure/services/auth/JwtService'
import { PasswordService } from '~/core/infrastructure/services/auth/PasswordService'

/***
 * Services
 */
container.registerSingleton<JwtService>('JwtService', JwtService)
container.registerSingleton<PasswordService>('PasswordService', PasswordService)

/***
 * Use Cases
 */
container.register<CreateRefreshTokenUseCase>('CreateRefreshTokenUseCase', {
  useClass: CreateRefreshTokenUseCase,
})
container.register<AuthenticateUserUseCase>('AuthenticateUserUseCase', {
  useClass: AuthenticateUserUseCase,
})
container.register<RefreshAuthTokenUseCase>('RefreshAuthTokenUseCase', {
  useClass: RefreshAuthTokenUseCase,
})

/**
 * Repositories
 */
container.register('RefreshTokenRepository', {
  useClass: RefreshTokenRepository,
})
