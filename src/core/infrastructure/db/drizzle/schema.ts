import { varchar, mysqlTable, datetime } from 'drizzle-orm/mysql-core'

export const usersTable = mysqlTable('User', {
  id: varchar('id', {
    length: 36,
  }).primaryKey(),
  firstname: varchar('firstname', {
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
  createdAt: datetime('createdAt').notNull(),
  updatedAt: datetime('updatedAt').default(null),
})
