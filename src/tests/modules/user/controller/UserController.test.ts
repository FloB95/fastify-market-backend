import { API_BASE_PATH, fastifyInstance } from '~/tests/setup.test'
import { faker } from '@faker-js/faker'
import { type IUserResponseDto } from '~/modules/user/application/dtos/UserResponseDto'
import { type IPaginationResult } from '~/core/interfaces/repositories/BaseRepository'
import { type ICreateUserDto } from '~/modules/user/application/dtos/UserCreateDto'

describe('UserController', () => {
  const createUserDto: ICreateUserDto = {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }

  describe('createUser', () => {
    it('should create a user and return it as JSON with status code 201', async () => {
      const response = await fastifyInstance.inject({
        method: 'POST',
        url: `${API_BASE_PATH}/users`,
        payload: createUserDto,
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
    })

    it('should return a 400 error if the request body is invalid', async () => {
      const response = await fastifyInstance.inject({
        method: 'POST',
        url: `${API_BASE_PATH}/users`,
        payload: {
          // Invalid payload with missing required fields
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
        path: ['firstname'],
        message: 'Required',
      })
      expect(responseBody.fieldErrors).toContainEqual({
        code: 'invalid_type',
        expected: 'string',
        received: 'undefined',
        path: ['lastname'],
        message: 'Required',
      })
      expect(responseBody.fieldErrors).toContainEqual({
        code: 'invalid_type',
        expected: 'string',
        received: 'undefined',
        path: ['email'],
        message: 'Required',
      })
      expect(responseBody.fieldErrors).toContainEqual({
        code: 'invalid_type',
        expected: 'string',
        received: 'undefined',
        path: ['password'],
        message: 'Required',
      })
    })
  })

  describe('getUsers', () => {
    it('should return a pagination with users and status code 200', async () => {
      const response = await fastifyInstance.inject({
        method: 'GET',
        url: `${API_BASE_PATH}/users`,
        query: { page: '1', limit: '20' },
      })

      expect(response.statusCode).toBe(200)

      const receivedUsers = JSON.parse(
        response.payload,
      ) as IPaginationResult<IUserResponseDto>

      expect(receivedUsers.page).toBe(1)
      expect(receivedUsers.total).toEqual(expect.any(Number))
      expect(receivedUsers.limit).toEqual(expect.any(Number))
      expect(Array.isArray(receivedUsers.data)).toBe(true)

      receivedUsers.data.forEach((userDto) => {
        expect(userDto.id).toBeDefined()
        expect(userDto.email).toBeDefined()
        expect(userDto.firstname).toBeDefined()
        expect(userDto.lastname).toBeDefined()
        expect(userDto.createdAt).toBeDefined()
        expect(userDto.updatedAt).toBeDefined()

        // @ts-ignore
        expect(userDto.password).toBeUndefined()
      })
    })

    it('should return a 400 error if the page query parameter is not a number', async () => {
      const response = await fastifyInstance.inject({
        method: 'GET',
        url: `${API_BASE_PATH}/users`,
        query: { page: 'invalid', limit: '20' },
      })

      expect(response.statusCode).toBe(400)
      const responseBody = JSON.parse(response.payload)
      expect(responseBody.message).toBeDefined()
      expect(responseBody.code).toBe(400)
      expect(responseBody.fieldErrors).toBeDefined()

      // Check individual field errors
      expect(responseBody.fieldErrors).toContainEqual({
        code: 'custom',
        path: ['page'],
        message: 'Page must be a positive integer',
      })
    })

    it('should return a 400 error if the limit query parameter is not a number', async () => {
      const response = await fastifyInstance.inject({
        method: 'GET',
        url: `${API_BASE_PATH}/users`,
        query: { page: '1', limit: 'invalid' },
      })

      expect(response.statusCode).toBe(400)
      const responseBody = JSON.parse(response.payload)
      expect(responseBody.message).toBeDefined()
      expect(responseBody.code).toBe(400)
      expect(responseBody.fieldErrors).toBeDefined()

      // Check individual field errors
      expect(responseBody.fieldErrors).toContainEqual({
        code: 'custom',
        path: ['limit'],
        message: 'Limit must be a positive integer',
      })
    })
  })
})
