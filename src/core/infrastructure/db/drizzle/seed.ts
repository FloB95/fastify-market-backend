import { faker } from '@faker-js/faker'
import { connection, db, initDb } from './setup'
import { v4 as uuidv4 } from 'uuid'
import { usersTable } from './schema'

async function runSeed() {
  await initDb()

  // Generate a million entries
  const numEntries = 1000000
  const batchSize = 10
  // Number of entries to insert in each batch
  for (let i = 0; i < numEntries; i += batchSize) {
    console.log('start creating batch', i)
    const entries = []
    for (let j = 0; j < batchSize; j++) {
      const id = uuidv4()
      const email = faker.internet.email()
      const firstname = faker.person.firstName()
      const lastname = faker.person.lastName()
      const password = faker.internet.password()
      const createdAt = faker.date.past()
      entries.push({
        id,
        firstname,
        lastname,
        email,
        createdAt,
        password,
      })
    }

    console.log('start inserting batch', i)
    try {
      await db
        .insert(usersTable)
        .values(entries)
        .onDuplicateKeyUpdate({
          set: { id: uuidv4(), email: faker.internet.email() },
        })
    } catch (error) {
      console.error('Error inserting batch', i, error)
    }
  }

  // Close the MySQL connection
  await connection.end()
}

void runSeed()
