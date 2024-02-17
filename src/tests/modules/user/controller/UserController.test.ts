import { type IPaginationResult } from '~/core/interfaces/repositories/BaseRepository'
import { type ICreateUserDto } from '~/modules/user/application/dtos/UserCreateDto'
import { type IUserResponseDto } from '~/modules/user/application/dtos/UserResponseDto'
import { fastifyInstance } from '~/tests/setup.test'
import { faker } from '@faker-js/faker'


describe('Test UserController', () => {
  const createUserDto: ICreateUserDto = {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  }

  describe('createUser', () => {
    it('should create a random user and return it as json http response with statuscode 201', async () => {
      const response = await fastifyInstance.inject({
        method: 'POST',
        url: '/api/v1/users',
        payload: createUserDto,
      })

      expect(response.statusCode).toBe(201)

      const receivedUser = JSON.parse(response.payload) as IUserResponseDto

      // Additional verification for each field can be added if necessary
      expect(receivedUser.id).toBeDefined()
      expect(receivedUser.email).toBe(createUserDto.email)
      expect(receivedUser.firstname).toBe(createUserDto.firstname)
      expect(receivedUser.lastname).toBe(createUserDto.lastname)
      expect(receivedUser.createdAt).toBeDefined()
      expect(receivedUser.updatedAt).toBeDefined()

      // Ensure that password field is not present
      // @ts-ignore
      expect(receivedUser.password).toBeUndefined()
    })
  })

  describe('getUsers', () => {
    it('should return a pagination with users and statuscode 200', async () => {
      const response = await fastifyInstance.inject({
        method: 'GET',
        url: '/api/v1/users',
        query: { page: '1', limit: '20' },
      })

      expect(response.statusCode).toBe(200)

      const receivedUsers = JSON.parse(
        response.payload,
      ) as IPaginationResult<IUserResponseDto>

      // Additional verification for each field can be added if necessary
      expect(receivedUsers.page).toBe(1)
      expect(receivedUsers.total).toEqual(expect.any(Number))
      expect(receivedUsers.limit).toEqual(expect.any(Number))
      expect(Array.isArray(receivedUsers.data)).toBe(true)

      // Ensure that each item in the array conforms to the IUserResponseDto interface
      receivedUsers.data.forEach((userDto) => {
        expect(userDto.id).toBeDefined()
        expect(userDto.email).toBeDefined()
        expect(userDto.firstname).toBeDefined()
        expect(userDto.lastname).toBeDefined()
        expect(userDto.createdAt).toBeDefined()
        expect(userDto.updatedAt).toBeDefined()

        // Ensure that password field is not present
        // @ts-ignore
        expect(userDto.password).toBeUndefined()
      })
    })
  })
})
