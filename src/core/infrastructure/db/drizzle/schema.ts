import { relations } from 'drizzle-orm'
import {
  varchar,
  mysqlTable,
  datetime,
  index,
  json,
} from 'drizzle-orm/mysql-core'
import { ROLES, type Roles } from '~/core/domain/enums/Roles'

export const usersTable = mysqlTable(
  'User',
  {
    id: varchar('id', {
      length: 36,
    }).primaryKey(),
    firstname: varchar('firstname', {
      length: 255,
    }).notNull(),
    password: varchar('password', {
      length: 255,
    }).notNull(),
    lastname: varchar('lastname', {
      length: 255,
    }).notNull(),
    email: varchar('email', {
      length: 255,
    })
      .notNull()
      .unique('email'),
    roles: json('roles')
      .$type<Roles[]>()
      .notNull()
      .default([ROLES.APPLICATION_USER]),
    createdAt: datetime('createdAt').notNull(),
    updatedAt: datetime('updatedAt').default(null),
  },
  (table) => {
    return {
      firstname: index('firstname').on(table.firstname),
      lastname: index('lastname').on(table.lastname),
      createdAt: index('createdAt').on(table.createdAt),
      updatedAt: index('updatedAt').on(table.updatedAt),
    }
  },
)

export const refreshTokensTable = mysqlTable(
  'RefreshToken',
  {
    id: varchar('id', {
      length: 36,
    }).primaryKey(),
    userId: varchar('userId', {
      length: 36,
    })
      .notNull()
      .unique('userId')
      .references(() => usersTable.id, { onDelete: 'cascade' }),
    expiresAt: datetime('expiresAt').notNull(),
    createdAt: datetime('createdAt').notNull(),
    updatedAt: datetime('updatedAt').default(null),
  },
  (table) => {
    return {
      expiresAt: index('expiresAt').on(table.expiresAt),
    }
  },
)

export const userRefreshTokenRelation = relations(refreshTokensTable, ({ one }) => ({
  author: one(usersTable, {
    fields: [refreshTokensTable.userId],
    references: [usersTable.id],
  }),
}))