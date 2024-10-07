import { type IUserResponseDto } from '~/core/domain/dtos/user/IUserResponseDto'
import {
  ADMIN_ACCESS_TOKEN,
  fastifyInstance,
} from './setup.test'
import { type IPaginationDto } from '~/core/domain/dtos/IPaginationDto'
import qs from 'qs'
import { API_BASE_PATH } from '~/core/config/constants'

/**
 * Represents the tests for getUsers.
 */
describe('getUsers', () => {
  let createdUser: IUserResponseDto
  beforeAll(async () => {
    // Create a user
    const createUserDto = {
      firstname: 'Firstname',
      lastname: 'Lastname',
      email: 'testGetUsersDummyTest@mail.de',
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
   * Represents the test case for default pagination.
   */
  it('tests default pagination, should return a pagination with users and status code 200', async () => {
    const response = await fastifyInstance.inject({
      method: 'GET',
      url: `${API_BASE_PATH}/users`,
      query: { page: '1', limit: '20' },
      headers: {
        authorization: ADMIN_ACCESS_TOKEN,
      },
    })

    expect(response.statusCode).toBe(200)

    const receivedUsers = JSON.parse(
      response.payload,
    ) as IPaginationDto<IUserResponseDto>

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

  /**
   * Represents the test case for invalid page param.
   */
  it('tests invalid page param, should return a 400 error if the page query parameter is not a number', async () => {
    const response = await fastifyInstance.inject({
      method: 'GET',
      url: `${API_BASE_PATH}/users`,
      query: { page: 'invalid', limit: '20' },
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
      code: 'custom',
      path: ['page'],
      message: 'Page must be a positive integer',
    })
  })

  /**
   * Represents the test case for getting users with selected fields.
   */
  it('get users with selected fields, should return a pagination with users and status code 200', async () => {
    const response = await fastifyInstance.inject({
      method: 'GET',
      url: `${API_BASE_PATH}/users`,
      query: { select: 'id,firstname,lastname,invalidFieldShouldBeIgnored!' },
      headers: {
        authorization: ADMIN_ACCESS_TOKEN,
      },
    })

    expect(response.statusCode).toBe(200)

    const receivedUsers = JSON.parse(
      response.payload,
    ) as IPaginationDto<IUserResponseDto>

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

  /**
   * Represents the test case for getting users by where eq condition.
   */
  it('get users by where eq condition, should find at least one user and return 200', async () => {
    const response = await fastifyInstance.inject({
      method: 'GET',
      url: `${API_BASE_PATH}/users`,
      query: {
        page: '1',
        limit: '20',
        where: qs.stringify({
          [`firstname[eq]`]: createdUser.firstname,
          [`lastname[eq]`]: createdUser.lastname,
          [`email[eq]`]: createdUser.email,
          [`createdAt[eq]`]: createdUser.createdAt as unknown as string,
        }),
      },
      headers: {
        authorization: ADMIN_ACCESS_TOKEN,
      },
    })

    expect(response.statusCode).toBe(200)

    const receivedUsers = JSON.parse(
      response.payload,
    ) as IPaginationDto<IUserResponseDto>

    expect(receivedUsers.page).toBe(1)
    expect(receivedUsers.total).toEqual(expect.any(Number))
    expect(receivedUsers.limit).toBe(20)
    expect(Array.isArray(receivedUsers.data)).toBe(true)
    expect(receivedUsers.data.length).toBeLessThanOrEqual(receivedUsers.limit)
    // compare the received user with the default system user
    expect(receivedUsers.data).toContainEqual(createdUser)
  })

  /**
   * Represents the test case for getting users by where neq condition.
   */
  it('get users by where neq condition, should not find the created user 200', async () => {
    const response = await fastifyInstance.inject({
      method: 'GET',
      url: `${API_BASE_PATH}/users`,
      query: {
        page: '1',
        limit: '20',
        where: qs.stringify({
          ['firstname[neq]']: createdUser.firstname,
          ['lastname[neq]']: createdUser.lastname,
          ['createdAt[eq]']: createdUser.createdAt as unknown as string,
        }),
      },
      headers: {
        authorization: ADMIN_ACCESS_TOKEN,
      },
    })

    expect(response.statusCode).toBe(200)

    const receivedUsers = JSON.parse(
      response.payload,
    ) as IPaginationDto<IUserResponseDto>

    expect(receivedUsers.page).toBe(1)
    expect(receivedUsers.total).toEqual(expect.any(Number))
    expect(receivedUsers.limit).toBe(20)
    expect(Array.isArray(receivedUsers.data)).toBe(true)
    expect(receivedUsers.data.length).toBeLessThanOrEqual(receivedUsers.limit)

    expect(receivedUsers.data).not.toContainEqual(createdUser)
  })

  /**
   * Represents the test case for invalid limit query parameter.
   */
  it('should return a 400 error if the limit query parameter is not a number', async () => {
    const response = await fastifyInstance.inject({
      method: 'GET',
      url: `${API_BASE_PATH}/users`,
      query: { page: '1', limit: 'invalid' },
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
      code: 'custom',
      path: ['limit'],
      message: 'Limit must be a positive integer',
    })
  })
})
