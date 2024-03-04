import { User } from '~/core/domain/entities/User'

export const DEFAULT_SYSTEM_USER: User = new User(
  '93d8755f-b7c9-45ae-b943-7b92129f26ad',
  'Florian',
  'Breuer',
  'fb@medium.ag',
  'testtest',
  ['APPLICATION_USER', 'SUPER_ADMIN'],
)
