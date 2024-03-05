import { DEFAULT_SYSTEM_USER } from '~/core/infrastructure/db/SeedObjects'
import { ADMIN_ACCESS_TOKEN, API_BASE_PATH, fastifyInstance } from './setup.test'
import { type IUserResponseDto } from '~/core/domain/dtos/user/IUserResponseDto'

/**
 * Represents the tests for getUserById.
 */
describe('getUserById', () => {
  /**
   * Represents the test case for getting a user by id.
   */
  it('should return a user by id', async () => {
    // Use the DEFAULT_SYSTEM_USER object to get the id
    const response = await fastifyInstance.inject({
      method: 'GET',
      url: `${API_BASE_PATH}/users/${DEFAULT_SYSTEM_USER.id}`,
      headers: {
        authorization: ADMIN_ACCESS_TOKEN,
      },
    })

    expect(response.statusCode).toBe(200)

    const receivedUser = JSON.parse(response.payload) as IUserResponseDto

    expect(receivedUser.id).toBe(DEFAULT_SYSTEM_USER.id)
    expect(receivedUser.email).toBe(DEFAULT_SYSTEM_USER.email)
    expect(receivedUser.firstname).toBe(DEFAULT_SYSTEM_USER.firstname)
    expect(receivedUser.lastname).toBe(DEFAULT_SYSTEM_USER.lastname)
    expect(receivedUser.createdAt).toBe(
      DEFAULT_SYSTEM_USER.createdAt.toISOString(),
    )
    expect(receivedUser.updatedAt).toBeDefined()

    // @ts-ignore
    expect(receivedUser.password).toBeUndefined()
  })

  /**
   * Represents the test case for getting a user by id when the user is not found.
   */
  it('should return a 404 error if the user is not found', async () => {
    const response = await fastifyInstance.inject({
      method: 'GET',
      url: `${API_BASE_PATH}/users/invalid-id`,
      headers: {
        authorization: ADMIN_ACCESS_TOKEN,
      },
    })

    expect(response.statusCode).toBe(404)
    const responseBody = JSON.parse(response.payload)
    expect(responseBody.message).toBeDefined()
    expect(responseBody.code).toBe(404)
  })
})
