import { API_BASE_PATH, fastifyInstance } from '~/tests/setup.test'
import { faker } from '@faker-js/faker'
import { type IUserResponseDto } from '~/modules/user/application/dtos/UserResponseDto'
import { type IPaginationResult } from '~/core/domain/repositories/BaseRepository'
import { type ICreateUserDto } from '~/modules/user/application/dtos/UserCreateDto'

describe('UserController', () => {
  const createUserDto: ICreateUserDto = {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }

  let createdUser: IUserResponseDto

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

      // Save the created user for later use
      createdUser = receivedUser
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
        path: ['firstname', 'lastname', 'email', 'password'],
        message: 'Required',
      })
    })
  })

  describe('getUsers', () => {
    it('tests default pagination, should return a pagination with users and status code 200', async () => {
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
      expect(receivedUsers.data.length).toBeLessThanOrEqual(receivedUsers.limit)

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

    it('tests invalid page param, should return a 400 error if the page query parameter is not a number', async () => {
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

    it('get users with selected fields, should return a pagination with users and status code 200', async () => {
      const response = await fastifyInstance.inject({
        method: 'GET',
        url: `${API_BASE_PATH}/users`,
        query: { select: 'id,firstname,lastname,invalidFieldShouldBeIgnored!' },
      })

      expect(response.statusCode).toBe(200)

      const receivedUsers = JSON.parse(
        response.payload,
      ) as IPaginationResult<IUserResponseDto>

      expect(receivedUsers.page).toBe(1)
      expect(receivedUsers.total).toEqual(expect.any(Number))
      expect(receivedUsers.limit).toEqual(expect.any(Number))
      expect(Array.isArray(receivedUsers.data)).toBe(true)
      expect(receivedUsers.data.length).toBeLessThanOrEqual(receivedUsers.limit)

      receivedUsers.data.forEach((userDto) => {
        expect(userDto.id).toBeDefined()
        expect(userDto.firstname).toBeDefined()
        expect(userDto.lastname).toBeDefined()

        // Check that other fields are undefined
        expect(userDto.email).toBeUndefined()
        expect(userDto.createdAt).toBeUndefined()
        expect(userDto.updatedAt).toBeUndefined()
        // @ts-ignore
        expect(userDto.password).toBeUndefined()
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

  describe('getUserById', () => {
    it('should return a user by id', async () => {
      // Use the createdUser object to get the id
      const response = await fastifyInstance.inject({
        method: 'GET',
        url: `${API_BASE_PATH}/users/${createdUser.id}`,
      })

      expect(response.statusCode).toBe(200)

      const receivedUser = JSON.parse(response.payload) as IUserResponseDto

      expect(receivedUser.id).toBe(createdUser.id)
      expect(receivedUser.email).toBe(createdUser.email)
      expect(receivedUser.firstname).toBe(createdUser.firstname)
      expect(receivedUser.lastname).toBe(createdUser.lastname)
      expect(receivedUser.createdAt).toBe(createdUser.createdAt)
      expect(receivedUser.updatedAt).toBe(createdUser.updatedAt)

      // @ts-ignore
      expect(receivedUser.password).toBeUndefined()
    })

    it('should return a 404 error if the user is not found', async () => {
      const response = await fastifyInstance.inject({
        method: 'GET',
        url: `${API_BASE_PATH}/users/invalid-id`,
      })

      expect(response.statusCode).toBe(404)
      const responseBody = JSON.parse(response.payload)
      expect(responseBody.message).toBeDefined()
      expect(responseBody.code).toBe(404)
    })
  })

  describe('updateUser', () => {
    it('should update a user and return it as JSON with status code 200', async () => {
      // Update the user
      const updatedUserDto = { firstname: 'Updated Firstname' }
      const updateResponse = await fastifyInstance.inject({
        method: 'PATCH',
        url: `${API_BASE_PATH}/users/${createdUser.id}`,
        payload: updatedUserDto,
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

    it('should return a 404 error if the user is not found', async () => {
      const response = await fastifyInstance.inject({
        method: 'PATCH',
        url: `${API_BASE_PATH}/users/invalid-id`,
        payload: { firstname: 'Updated Firstname' },
      })

      expect(response.statusCode).toBe(404)
      const responseBody = JSON.parse(response.payload)
      expect(responseBody.message).toBeDefined()
      expect(responseBody.code).toBe(404)
    })
  })

  describe('deleteUser', () => {
    it('should delete a user and return true with status code 200', async () => {
      // Update the user
      const deleteResponse = await fastifyInstance.inject({
        method: 'DELETE',
        url: `${API_BASE_PATH}/users/${createdUser.id}`,
      })

      expect(deleteResponse.statusCode).toBe(200)

      const deletedUser = JSON.parse(deleteResponse.payload) as IUserResponseDto

      expect(deletedUser).toBe(true)

      // check if user is deleted
      const getUserResponse = await fastifyInstance.inject({
        method: 'GET',
        url: `${API_BASE_PATH}/users/${createdUser.id}`,
      })
      expect(getUserResponse.statusCode).toBe(404)
    })

    it('should return a 404 error if the user is not found', async () => {
      const response = await fastifyInstance.inject({
        method: 'DELETE',
        url: `${API_BASE_PATH}/users/invalid-id`,
      })

      expect(response.statusCode).toBe(404)
      const responseBody = JSON.parse(response.payload)
      expect(responseBody.message).toBeDefined()
      expect(responseBody.code).toBe(404)
    })
  })
})
