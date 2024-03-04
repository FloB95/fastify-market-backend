import { db } from './setup'
import { usersTable } from './schema'
import { User } from '~/core/domain/entities/User'
import { eq } from 'drizzle-orm'
import { logger } from '../../logger'
import { PasswordService } from '../../services/auth/PasswordService'
import { type IPasswordService } from '~/core/application/services/IPasswordService'
import { container } from 'tsyringe'

export const DEFAULT_SYSTEM_USER: User = new User(
  '93d8755f-b7c9-45ae-b943-7b92129f26ad',
  'Florian',
  'Breuer',
  'fb@medium.ag',
  'testtest',
  ['APPLICATION_USER', 'SUPER_ADMIN'],
)

// if user exists, do nothing
async function createDefaultUser() {
  try {
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.id, DEFAULT_SYSTEM_USER.id),
    })

    if (user) return

    const passwordService = container.resolve<IPasswordService>(PasswordService)
    await db.insert(usersTable).values({
      ...DEFAULT_SYSTEM_USER,
      password: await passwordService.hashPassword(
        DEFAULT_SYSTEM_USER.password,
      ),
    })
  } catch (error) {
    console.error('Error creating default user', error)
  }
}

export async function runSeeds() {
  logger.info('Running seeds')
  // create default user if not exists
  await createDefaultUser()
}
