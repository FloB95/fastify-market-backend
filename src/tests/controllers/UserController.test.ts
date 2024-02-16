import { sleep } from '~/core/utils/general'
import { type UserController } from '~/modules/user/adapters/controllers/UserController'

describe('UserController', () => {
  let userController: UserController

  describe('createUser', () => {
    it('should return a successful response when a valid request is provided', async () => {
      await sleep(10)
      console.log('UserController', userController)
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
