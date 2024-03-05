import { db } from './setup'
import { usersTable } from './schema'
import { eq } from 'drizzle-orm'
import { logger } from '../../logger'
import { PasswordService } from '../../services/auth/PasswordService'
import { type IPasswordService } from '~/core/application/services/IPasswordService'
import { container } from 'tsyringe'
import { DEFAULT_SYSTEM_SUPER_ADMIN, DEFAULT_SYSTEM_USER } from '../SeedObjects'

// if user exists, do nothing
async function createDefaultUser() {
  try {
    // create default system user
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.id, DEFAULT_SYSTEM_USER.id),
    })

    if (!user) {
      const passwordService =
        container.resolve<IPasswordService>(PasswordService)
      await db.insert(usersTable).values({
        ...DEFAULT_SYSTEM_USER,
        password: await passwordService.hashPassword(
          DEFAULT_SYSTEM_USER.password,
        ),
      })
    }

    // create default admin user
    const adminUser = await db.query.usersTable.findFirst({
      where: eq(usersTable.id, DEFAULT_SYSTEM_SUPER_ADMIN.id),
    })

    if (!adminUser) {
      const passwordService =
        container.resolve<IPasswordService>(PasswordService)
      await db.insert(usersTable).values({
        ...DEFAULT_SYSTEM_SUPER_ADMIN,
        password: await passwordService.hashPassword(
          DEFAULT_SYSTEM_SUPER_ADMIN.password,
        ),
      })
    }
  } catch (error) {
    console.error('Error creating default user', error)
  }
}

export async function runSeeds() {
  logger.info('Running seeds')
  // create default user if not exists
  await createDefaultUser()
}
