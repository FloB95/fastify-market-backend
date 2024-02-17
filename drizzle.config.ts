import 'dotenv/config'
import type { Config } from 'drizzle-kit'

export default {
  schema: './src/core/infrastructure/db/drizzle/schema.ts',
  out: './src/core/infrastructure/db/drizzle/migrations',
  driver: 'mysql2', // 'pg' | 'mysql2' | 'better-sqlite' | 'libsql' | 'turso'
  dbCredentials: {
    host: process.env.DB_HOST!,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME!,
  },
} satisfies Config
