import { createUserController } from '~/core/factories/controllers/UserControllerFactory'
import { type UserController } from '~/core/infrastructure/web/controllers/UserController'

describe('UserController', () => {
  let userController: UserController

  beforeEach(() => {
    userController = createUserController()
  })

  describe('createUser', () => {
    it('should return a successful response when a valid request is provided', async () => {
    //   // Arrange
    //   const httpRequest = {
    //     // Provide the necessary properties for the request
    //   }

    //   // Act
    //   const httpResponse = await userController.createUser(httpRequest)

    //   // Assert
    //   // Add your assertions here to verify the expected response
    // })

    // it('should return an error response when an invalid request is provided', async () => {
    //   // Arrange
    //   const httpRequest = {
    //     // Provide an invalid request
    //   }

    //   // Act
    //   const httpResponse = await userController.createUser(httpRequest)

    //   // Assert
    //   // Add your assertions here to verify the expected error response
    })
  })
})
