import { User } from '~/core/domain/entities/User'

const u: User = new User(
  '93d8755f-b7c9-45ae-b943-7b92129f26ad',
  'Florian',
  'Breuer',
  'fb@medium.ag',
  'testtest',
  ['APPLICATION_USER'],
)
u.createdAt = new Date('2021-08-01T00:00:00.000Z')
u.updatedAt = new Date('2021-08-01T00:00:00.000Z')

export const DEFAULT_SYSTEM_USER = u

const u2: User = new User(
  '00004657-6bb2-4c56-a3bd-2b0807a54bbf',
  'Florian',
  'Breuer',
  'info@fb-dev.de',
  'testtest',
  ['APPLICATION_USER', 'SUPER_ADMIN'],
)
u.createdAt = new Date('2021-08-02T00:00:00.000Z')
u.updatedAt = new Date('2021-08-02T00:00:00.000Z')

export const DEFAULT_SYSTEM_SUPER_ADMIN = u2
