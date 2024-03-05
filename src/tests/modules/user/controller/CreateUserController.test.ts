import { type ICreateUserDto } from '~/core/domain/dtos/user/ICreateUserDto'
import {
  API_BASE_PATH,
  fastifyInstance,
  faker,
  ADMIN_ACCESS_TOKEN,
  DEFAULT_ACCESS_TOKEN,
} from './setup.test'
import { type IUserResponseDto } from '~/core/domain/dtos/user/IUserResponseDto'

/**
 * Represents the tests for createUser.
 */
describe('createUser', () => {
  const createUserDto: ICreateUserDto = {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }

  let createdUser: IUserResponseDto

  afterAll(async () => {
    // Delete the created user
    await fastifyInstance.inject({
      method: 'DELETE',
      url: `${API_BASE_PATH}/users/${createdUser.id}`,
      headers: {
        authorization: ADMIN_ACCESS_TOKEN,
      },
    })
  })

  /**
   * Represents the test case for creating a user.
   */
  it('should create a user and return it as JSON with status code 201', async () => {
    const response = await fastifyInstance.inject({
      method: 'POST',
      url: `${API_BASE_PATH}/users`,
      payload: createUserDto,
      headers: {
        authorization: ADMIN_ACCESS_TOKEN,
      },
    })

    expect(response.statusCode).toBe(201)

    const receivedUser = JSON.parse(response.payload) as IUserResponseDto

    expect(receivedUser.id).toBeDefined()
    expect(receivedUser.email).toBe(createUserDto.email)
    expect(receivedUser.firstname).toBe(createUserDto.firstname)
    expect(receivedUser.lastname).toBe(createUserDto.lastname)
    expect(receivedUser.createdAt).toBeDefined()
    expect(receivedUser.updatedAt).toBeDefined()

    // @ts-ignore
    expect(receivedUser.password).toBeUndefined()

    createdUser = receivedUser
  })

  /**
   * Represents the test case for invalid request body.
   */
  it('should return a 400 error if the request body is invalid', async () => {
    const response = await fastifyInstance.inject({
      method: 'POST',
      url: `${API_BASE_PATH}/users`,
      payload: {
        // Invalid payload with missing required fields
      },
      headers: {
        authorization: ADMIN_ACCESS_TOKEN,
      },
    })

    expect(response.statusCode).toBe(400)

    const responseBody = JSON.parse(response.payload)
    expect(responseBody.message).toBeDefined()
    expect(responseBody.code).toBe(400)
    expect(responseBody.fieldErrors).toBeDefined()

    // Check individual field errors
    expect(responseBody.fieldErrors).toContainEqual({
      code: 'invalid_type',
      expected: 'string',
      received: 'undefined',
      path: ['firstname', 'lastname', 'email', 'password'],
      message: 'Required',
    })
  })

  /**
   * Represents the test case for no authorization header.
   */
  it('should return a 401 error if no authorization header', async () => {
    const response = await fastifyInstance.inject({
      method: 'POST',
      url: `${API_BASE_PATH}/users`,
      payload: createUserDto,
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
      method: 'POST',
      url: `${API_BASE_PATH}/users`,
      payload: createUserDto,
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
