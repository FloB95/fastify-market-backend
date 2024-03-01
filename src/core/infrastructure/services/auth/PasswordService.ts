import * as argon2 from 'argon2'
import { injectable, singleton } from 'tsyringe'
import { type IPasswordService } from '~/core/application/services/IPasswordService'

/**
 * Implementation of the password hashing provider using bcrypt.
 *
 * @class
 * @implements {IPasswordService}
 */
@injectable()
@singleton()
export class PasswordService implements IPasswordService {
  /**
   * Hashes a given password using bcrypt.
   *
   * @async
   * @param {string} password - The password to hash.
   * @returns {Promise<string>} The hashed password.
   */
  async hashPassword(password: string): Promise<string> {
    return await argon2.hash(password)
  }

  /**
   * Compares a plain text password with a hashed password to check for a match.
   *
   * @async
   * @param {string} password - The plain text password.
   * @param {string} hashedPassword - The hashed password to compare against.
   * @returns {Promise<boolean>} True if the passwords match, false otherwise.
   */
  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await argon2.verify(hashedPassword, password)
  }
}
