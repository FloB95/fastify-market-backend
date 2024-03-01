import { API_BASE_PATH, fastifyInstance } from '~/tests/setup.test'
import { faker } from '@faker-js/faker'
import { type ICreateUserDto } from '~/core/domain/dtos/user/ICreateUserDto'
import { type IUserResponseDto } from '~/core/domain/dtos/user/IUserResponseDto'
import { type ISignInResponseDto } from '~/core/domain/dtos/auth/ISignInResponseDto'
import { container } from 'tsyringe'
import { type IJwtService } from '~/core/application/services/IJwtService'

/**
 * Represents the SignInController.
 */
describe('SignInController', () => {
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

  describe('signIn', () => {
    it('it should sign in the created user and return a 200 status code with accessToken and refreshToken', async () => {
      const response = await fastifyInstance.inject({
        method: 'POST',
        url: `${API_BASE_PATH}/auth/sign-in`,
        payload: {
          email: createdUser.email,
          password: createUserDto.password,
        },
      })

      expect(response.statusCode).toBe(200)

      const receivedUser = JSON.parse(response.payload) as ISignInResponseDto

      expect(receivedUser.accessToken).toBeDefined()
      expect(receivedUser.refreshToken).toBeDefined()

      const jwtService: IJwtService = container.resolve('JwtService')
      expect(jwtService.verifyToken(receivedUser.accessToken)).not.toBe(false)
      expect(jwtService.verifyToken(receivedUser.refreshToken)).not.toBe(false)
    })

    it('should return a 400 error if no credentials provided', async () => {
      const response = await fastifyInstance.inject({
        method: 'POST',
        url: `${API_BASE_PATH}/auth/sign-in`,
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
        path: ['email', 'password'],
        message: 'Required',
      })
    })

    it('should return a 400 error if no valid email', async () => {
      const response = await fastifyInstance.inject({
        method: 'POST',
        url: `${API_BASE_PATH}/auth/sign-in`,
        payload: {
          email: 'invalid_email',
          password: 'valid random password',
        },
      })

      expect(response.statusCode).toBe(400)

      const responseBody = JSON.parse(response.payload)
      expect(responseBody.message).toBeDefined()
      expect(responseBody.code).toBe(400)
      expect(responseBody.fieldErrors).toBeDefined()

      // Check individual field errors
      expect(responseBody.fieldErrors).toContainEqual({
        validation: 'email',
        code: 'invalid_string',
        message: 'Invalid email',
        path: ['email'],
      })
    })

    it('should return a 400 error if no valid password', async () => {
      const response = await fastifyInstance.inject({
        method: 'POST',
        url: `${API_BASE_PATH}/auth/sign-in`,
        payload: {
          email: createdUser.email,
          password: 't',
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
        minimum: 6,
        type: 'string',
        inclusive: true,
        exact: false,
        message: 'String must contain at least 6 character(s)',
        path: ['password'],
      })
    })

    it('should return a 401 error if credentials are not valid', async () => {
      const response = await fastifyInstance.inject({
        method: 'POST',
        url: `${API_BASE_PATH}/auth/sign-in`,
        payload: {
          email: createdUser.email,
          password: 'invalid_password',
        },
      })

      expect(response.statusCode).toBe(401)

      const responseBody = JSON.parse(response.payload)
      expect(responseBody.message).toBe('Email or password wrong')
      expect(responseBody.code).toBe(401)
    })
  })
})
