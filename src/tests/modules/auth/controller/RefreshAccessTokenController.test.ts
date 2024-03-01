import { API_BASE_PATH, fastifyInstance } from '~/tests/setup.test'
import { faker } from '@faker-js/faker'
import { type ICreateUserDto } from '~/core/domain/dtos/user/ICreateUserDto'
import { type IUserResponseDto } from '~/core/domain/dtos/user/IUserResponseDto'
import { type ISignInResponseDto } from '~/core/domain/dtos/auth/ISignInResponseDto'
import { type IJwtService } from '~/core/application/services/IJwtService'
import { container } from 'tsyringe'

/**
 * Represents the RefreshAccessTokenController.
 */
describe('RefreshAccessTokenController', () => {
  /**
   * Represents the created user.
   */
  let createdUser: IUserResponseDto

  const createUserDto: ICreateUserDto = {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }

  // create a user before all tests
  beforeAll(async () => {
    const response = await fastifyInstance.inject({
      method: 'POST',
      url: `${API_BASE_PATH}/users`,
      payload: createUserDto,
    })

    const receivedUser = JSON.parse(response.payload) as IUserResponseDto
    createdUser = receivedUser
  })

  // deleted the created user after all tests
  afterAll(async () => {
    await fastifyInstance.inject({
      method: 'DELETE',
      url: `${API_BASE_PATH}/users/${createdUser.id}`,
    })
  })

  describe('refreshAccessToken', () => {
    it('should return a 200 status code with a new access token', async () => {
      const signInResponse = await fastifyInstance.inject({
        method: 'POST',
        url: `${API_BASE_PATH}/auth/sign-in`,
        payload: {
          email: createdUser.email,
          password: createUserDto.password,
        },
      })

      const signInResponseBody = JSON.parse(
        signInResponse.payload,
      ) as ISignInResponseDto

      const response = await fastifyInstance.inject({
        method: 'POST',
        url: `${API_BASE_PATH}/auth/refresh-access-token`,
        payload: {
          refreshToken: signInResponseBody.refreshToken,
        },
      })

      expect(response.statusCode).toBe(200)

      const responseBody = JSON.parse(response.payload)
      expect(responseBody.accessToken).toBeDefined()

      const jwtService: IJwtService = container.resolve('JwtService')
      expect(jwtService.verifyToken(responseBody.accessToken)).not.toBe(false)
    })

    it('should return a 400 error if no refresh token provided', async () => {
      const response = await fastifyInstance.inject({
        method: 'POST',
        url: `${API_BASE_PATH}/auth/refresh-access-token`,
        payload: {},
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
        path: ['refreshToken'],
        message: 'Required',
      })
    })

    it('should return a 401 error if refresh token is not valid', async () => {
      const response = await fastifyInstance.inject({
        method: 'POST',
        url: `${API_BASE_PATH}/auth/refresh-access-token`,
        payload: {
          refreshToken: 'invalid_refresh_token',
        },
      })

      expect(response.statusCode).toBe(401)

      const responseBody = JSON.parse(response.payload)
      expect(responseBody.message).toBe('Invalid refresh token')
      expect(responseBody.code).toBe(401)
    })
  })
})
