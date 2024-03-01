/**
 * Interface representing a service for generating and verifying authentication tokens.
 * @interface
 */
export interface IJwtService {
  /**
   * Generates an authentication token.
   * @param {string | object} payload - The data to include in the token.
   * @param {string | number} [expiresIn] - The expiration time expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d".
   * @returns {string} The generated authentication token.
   */
  generateToken(payload: string | object, expiresIn?: string | number): string

  /**
   * Verifies the authenticity of an authentication token.
   * @param {string} token - The authentication token to verify.
   * @returns {boolean | string | object} The result of the verification.
   * Returns `true` if the token is valid, otherwise returns a string or an object with details about the error.
   */
  verifyToken(token: string): boolean | string | object
}
