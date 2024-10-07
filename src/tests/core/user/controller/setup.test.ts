// Common imports and setup required for all test files
import { fastifyInstance } from '~/tests/setup.test'
import { faker } from '@faker-js/faker'
import { container } from 'tsyringe'
import {
  DEFAULT_SYSTEM_SUPER_ADMIN,
  DEFAULT_SYSTEM_USER,
} from '~/core/infrastructure/db/SeedObjects'
import { type AuthenticateUserUseCase } from '~/core/application/useCases/auth/implementations/AuthenticateUserUseCase'

let DEFAULT_ACCESS_TOKEN: string
let ADMIN_ACCESS_TOKEN: string

beforeAll(async () => {
  const { accessToken } = await container
    .resolve<AuthenticateUserUseCase>('AuthenticateUserUseCase')
    .execute({
      email: DEFAULT_SYSTEM_USER.email,
      password: DEFAULT_SYSTEM_USER.password,
    })
  DEFAULT_ACCESS_TOKEN = accessToken

  const { accessToken: adminAccessToken } = await container
    .resolve<AuthenticateUserUseCase>('AuthenticateUserUseCase')
    .execute({
      email: DEFAULT_SYSTEM_SUPER_ADMIN.email,
      password: DEFAULT_SYSTEM_SUPER_ADMIN.password,
    })
  ADMIN_ACCESS_TOKEN = adminAccessToken
})

export { fastifyInstance, faker, DEFAULT_ACCESS_TOKEN, ADMIN_ACCESS_TOKEN }
