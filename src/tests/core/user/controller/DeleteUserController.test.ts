import { type IUserResponseDto } from '~/core/domain/dtos/user/IUserResponseDto'
import {
  ADMIN_ACCESS_TOKEN,
  DEFAULT_ACCESS_TOKEN,
  fastifyInstance,
} from './setup.test'
import { API_BASE_PATH } from '~/core/config/constants'

/**
 * Represents the tests for deleteUser.
 */
describe('deleteUser', () => {
  let createdUser: IUserResponseDto

  beforeAll(async () => {
    // Create a user
    const createUserDto = {
      firstname: 'Firstname',
      lastname: 'Lastname',
      email: 'testDelete1lDummyTest@mail.de',
      password: 'password',
    }

    const response = await fastifyInstance.inject({
      method: 'POST',
      url: `${API_BASE_PATH}/users`,
      payload: createUserDto,
      headers: {
        authorization: ADMIN_ACCESS_TOKEN,
      },
    })

    createdUser = JSON.parse(response.payload) as IUserResponseDto
  })

  /**
   * Represents the test case for deleting a user.
   */
  it('should delete a user and return true with status code 200', async () => {
    // Update the user
    const deleteResponse = await fastifyInstance.inject({
      method: 'DELETE',
      url: `${API_BASE_PATH}/users/${createdUser.id}`,
      headers: {
        authorization: ADMIN_ACCESS_TOKEN,
      },
    })

    expect(deleteResponse.statusCode).toBe(200)

    const deletedUser = JSON.parse(deleteResponse.payload) as IUserResponseDto

    expect(deletedUser).toBe(true)

    // check if user is deleted
    const getUserResponse = await fastifyInstance.inject({
      method: 'GET',
      url: `${API_BASE_PATH}/users/${createdUser.id}`,
      headers: {
        authorization: ADMIN_ACCESS_TOKEN,
      },
    })
    expect(getUserResponse.statusCode).toBe(404)
  })

  /**
   * Represents the test case for deleting a user when the user is not found.
   */
  it('should return a 404 error if the user is not found', async () => {
    const response = await fastifyInstance.inject({
      method: 'DELETE',
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

  /**
   * Represents the test case for no authorization header.
   */
  it('should return a 401 error if no authorization header', async () => {
    const response = await fastifyInstance.inject({
      method: 'DELETE',
      url: `${API_BASE_PATH}/users/${createdUser.id}`,
    })

    expect(response.statusCode).toBe(401)

    const responseBody = JSON.parse(response.payload)
    expect(responseBody.message).toBeDefined()
    expect(responseBody.code).toBe(401)
  })

  /**
   * Represents the test case for no access cause of wrong roles.
   */
  it('should return a 403 error because wrong roles', async () => {
    const response = await fastifyInstance.inject({
      method: 'DELETE',
      url: `${API_BASE_PATH}/users/${createdUser.id}`,
      headers: {
        authorization: DEFAULT_ACCESS_TOKEN,
      },
    })

    expect(response.statusCode).toBe(403)

    const responseBody = JSON.parse(response.payload)
    expect(responseBody.message).toBeDefined()
    expect(responseBody.code).toBe(403)
  })
})
