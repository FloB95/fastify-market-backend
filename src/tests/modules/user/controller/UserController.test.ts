import { type User } from '~/modules/user/domain/entities/User'
import { fastifyInstance } from '~/tests/setup.test'

describe('Test UserController', () => {
  const demoUser: User = {
    id: '121',
    email: 'john.doe@test.de',
    password: 'password',
  }

  describe('createUser', () => {
    it('should create a random user and return it as json http response with statuscode 201', async () => {
      const response = await fastifyInstance.inject({
        method: 'POST',
        url: '/api/v1/users',
        payload: demoUser,
      })

      expect(response.statusCode).toBe(201)
      expect(response.json()).toEqual(demoUser)
    })
  })
})
