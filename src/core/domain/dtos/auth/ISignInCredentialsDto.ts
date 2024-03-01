import { type z } from 'zod'
import { UserSchema } from '../../entities/User'

/**
 * Schema for sign-in credentials.
 * @constant {z.ZodObject} SignInCredentialsSchema
 */
export const SignInCredentialsSchema = UserSchema.pick({
  email: true,
  password: true,
})

/**
 * Interface for sign-in credentials DTO.
 * @interface
 * @extends z.infer<typeof SignInCredentialsSchema>
 */
export interface ISignInCredentialsDto
  extends z.infer<typeof SignInCredentialsSchema> {}
