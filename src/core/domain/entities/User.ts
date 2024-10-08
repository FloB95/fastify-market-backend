import { z } from 'zod'
import { BaseEntity, BaseEntitySchema } from './BaseEntity'
import { ROLES, type Roles } from '../enums/Roles'

/**
 * The schema for the User entity.
 */
export const UserSchema = z.object({
  ...BaseEntitySchema.shape,
  firstname: z.string().min(3).max(50),
  lastname: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(255),
  lastLogin: z.date().nullable().default(null),
  roles: z.array(z.nativeEnum(ROLES)),
})

/**
 * Represents a user entity.
 */
export class User extends BaseEntity {
  /**
   * Creates an instance of User.
   * @param {string} id The unique identifier of the user.
   * @param {string} firstname The first name of the user.
   * @param {string} lastname The last name of the user.
   * @param {string} email The email address of the user.
   * @param {string} password The password of the user.
   * @param {Roles[]} roles of the user.
   */

  public lastLogin: Date | null = null

  constructor(
    public readonly id: string,
    public firstname: string,
    public lastname: string,
    public email: string,
    public password: string,
    public roles: Roles[],
  ) {
    super(id)
  }

  /**
   * Sets the date and time when the user last logged in.
   * @param {Date | null} date The date and time when the user last logged in.
   */
  setLastLogin(date: Date | null) {
    this.lastLogin = date
  }
}
