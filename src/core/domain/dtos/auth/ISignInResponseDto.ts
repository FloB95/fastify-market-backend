/**
 * Interface for the sign-in response DTO.
 * @interface
 */
export interface ISignInResponseDto {
  /**
   * The access token.
   * @type {string}
   */
  accessToken: string

  /**
   * The refresh token.
   * @type {string}
   */
  refreshToken: string
}
