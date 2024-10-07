import { type ISignInResponseDto } from '~/core/domain/dtos/auth/ISignInResponseDto'
import { type IJwtService } from '~/core/application/services/IJwtService'
import { container } from 'tsyringe'
import { DEFAULT_SYSTEM_USER } from '~/core/infrastructure/db/SeedObjects'
import { fastifyInstance } from '~/tests/setup.test'
import { API_BASE_PATH } from '~/core/config/constants'

/**
 * Represents the RefreshAccessTokenController.
 */
describe('RefreshAccessTokenController', () => {
  describe('refreshAccessToken', () => {
    it('should return a 200 status code with a new access token', async () => {
      const signInResponse = await fastifyInstance.inject({
        method: 'POST',
        url: `${API_BASE_PATH}/auth/sign-in`,
        payload: {
          email: DEFAULT_SYSTEM_USER.email,
          password: DEFAULT_SYSTEM_USER.password,
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
