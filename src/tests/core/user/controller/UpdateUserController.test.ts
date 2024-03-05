import { type IUserResponseDto } from '~/core/domain/dtos/user/IUserResponseDto'
import {
  ADMIN_ACCESS_TOKEN,
  API_BASE_PATH,
  DEFAULT_ACCESS_TOKEN,
  fastifyInstance,
} from './setup.test'
import { ROLES } from '~/core/domain/enums/Roles'
import { container } from 'tsyringe'
import { type AuthenticateUserUseCase } from '~/core/application/useCases/auth/implementations/AuthenticateUserUseCase'

/**
 * Represents the tests for updateUser.
 */
describe('updateUser', () => {
  let createdUser: IUserResponseDto
  let CREATED_USER_ACCESS_TOKEN: string
  beforeAll(async () => {
    // Create a user
    const createUserDto = {
      firstname: 'Firstname',
      lastname: 'Lastname',
      email: 'testUpdatelDummyTest@mail.de',
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

    // get access token for the created user
    const { accessToken } = await container
      .resolve<AuthenticateUserUseCase>('AuthenticateUserUseCase')
      .execute({
        email: createdUser.email,
        password: createUserDto.password,
      })
    CREATED_USER_ACCESS_TOKEN = accessToken
  })

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
   * Represents the test case for updating a user.
   */
  it('should update a user and return it as JSON with status code 200', async () => {
    // Update the user
    const updatedUserDto = { firstname: 'Updated Firstname' }
    const updateResponse = await fastifyInstance.inject({
      method: 'PATCH',
      url: `${API_BASE_PATH}/users/${createdUser.id}`,
      payload: updatedUserDto,
      headers: {
        authorization: ADMIN_ACCESS_TOKEN,
      },
    })

    expect(updateResponse.statusCode).toBe(200)

    const updatedUser = JSON.parse(updateResponse.payload) as IUserResponseDto

    expect(updatedUser.id).toBe(createdUser.id)
    expect(updatedUser.email).toBe(createdUser.email)
    expect(updatedUser.firstname).toBe(updatedUserDto.firstname)
    expect(updatedUser.lastname).toBe(createdUser.lastname)
    expect(updatedUser.createdAt).toBe(createdUser.createdAt)
    expect(updatedUser.updatedAt).toBeDefined()

    // @ts-ignore
    expect(updatedUser.password).toBeUndefined()
  })

  /**
   * Represents the test case for updating a user with an invalid dto passed.
   */
  it('should return a 400 error because of an invalid dto passed', async () => {
    // Update the user
    const updatedUserDto = {
      firstname: 's',
      email: 'invalid email',
    }
    const response = await fastifyInstance.inject({
      method: 'PATCH',
      url: `${API_BASE_PATH}/users/${createdUser.id}`,
      payload: updatedUserDto,
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
      code: 'too_small',
      minimum: 3,
      type: 'string',
      inclusive: true,
      exact: false,
      message: 'String must contain at least 3 character(s)',
      path: ['firstname'],
    })

    expect(responseBody.fieldErrors).toContainEqual({
      validation: 'email',
      code: 'invalid_string',
      message: 'Invalid email',
      path: ['email'],
    })
  })

  /**
   * Represents the test case for updating a user when the user is not found.
   */
  it('should return a 404 error if the user is not found', async () => {
    const response = await fastifyInstance.inject({
      method: 'PATCH',
      url: `${API_BASE_PATH}/users/invalid-id`,
      payload: { firstname: 'Updated Firstname' },
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
    const updatedUserDto = { firstname: 'Updated Firstname' }
    const response = await fastifyInstance.inject({
      method: 'PATCH',
      url: `${API_BASE_PATH}/users/${createdUser.id}`,
      payload: updatedUserDto,
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
    const updatedUserDto = { firstname: 'Updated Firstname' }
    const response = await fastifyInstance.inject({
      method: 'PATCH',
      url: `${API_BASE_PATH}/users/${createdUser.id}`,
      payload: updatedUserDto,
      headers: {
        authorization: DEFAULT_ACCESS_TOKEN,
      },
    })

    expect(response.statusCode).toBe(403)

    const responseBody = JSON.parse(response.payload)
    expect(responseBody.message).toBeDefined()
    expect(responseBody.code).toBe(403)
  })

  /**
   * Represents the test case for user updating himself
   */
  it('should return a 200 since a user should be able to update himself', async () => {
    const updatedUserDto = { firstname: createdUser.firstname }
    const response = await fastifyInstance.inject({
      method: 'PATCH',
      url: `${API_BASE_PATH}/users/${createdUser.id}`,
      payload: updatedUserDto,
      headers: {
        authorization: CREATED_USER_ACCESS_TOKEN,
      },
    })

    expect(response.statusCode).toBe(200)

    const updatedUser = JSON.parse(response.payload) as IUserResponseDto

    expect(updatedUser.id).toBe(createdUser.id)
    expect(updatedUser.email).toBe(createdUser.email)
    expect(updatedUser.firstname).toBe(createdUser.firstname)
    expect(updatedUser.lastname).toBe(createdUser.lastname)
    expect(updatedUser.createdAt).toBe(createdUser.createdAt)
    expect(updatedUser.updatedAt).toBeDefined()
  })

  /**
   * Represents the test case for user updating himself with invalid roles
   */
  it('should return a 200 but ignore the SUPER_ADMIN role to update to user', async () => {
    const updatedUserDto = {
      firstname: createdUser.firstname,
      roles: [ROLES.SUPER_ADMIN],
    }
    const response = await fastifyInstance.inject({
      method: 'PATCH',
      url: `${API_BASE_PATH}/users/${createdUser.id}`,
      payload: updatedUserDto,
      headers: {
        authorization: CREATED_USER_ACCESS_TOKEN,
      },
    })

    expect(response.statusCode).toBe(200)

    const updatedUser = JSON.parse(response.payload) as IUserResponseDto

    expect(updatedUser.id).toBe(createdUser.id)
    expect(updatedUser.email).toBe(createdUser.email)
    expect(updatedUser.firstname).toBe(createdUser.firstname)
    expect(updatedUser.lastname).toBe(createdUser.lastname)
    expect(updatedUser.createdAt).toBe(createdUser.createdAt)
    expect(updatedUser.updatedAt).toBeDefined()

    // roles should not include SUPER_ADMIN
    expect(updatedUser.roles).not.toContain(ROLES.SUPER_ADMIN)
  })
})
