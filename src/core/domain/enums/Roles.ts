const APPLICATION_ROLES = [
  // users
  'users:maintainer', // Allowed to maintain users
  'users:write', // Allowed to create users
  'users:update', // Allowed to update users
  'users:read', // Allowed to read users
  'users:delete', // Allowed to delete users

  // orders
  'orders:maintainer', // Allowed to maintain orders
  'order:write', // Allowed to create orders
  'order:update', // Allowed to update orders
  'order:read', // Allowed to read orders
  'order:delete', // Allowed to delete orders
] as const

const SYSTEM_ROLES = ['SUPER_ADMIN', 'APPLICATION_USER'] as const

export const ROLES = [...APPLICATION_ROLES, ...SYSTEM_ROLES].reduce(
  (acc, permission) => {
    acc[permission] = permission

    return acc
  },
  {} as Record<Roles, Roles>,
)

export type ApplicationRoles = (typeof APPLICATION_ROLES)[number]
export type SystemRoles = (typeof SYSTEM_ROLES)[number]
export type Roles = ApplicationRoles | SystemRoles
