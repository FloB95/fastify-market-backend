import { type z } from 'zod'
import { UserSchema } from '../../entities/User'
import { BaseEntitySchema } from '../../entities/BaseEntity'

/**
 * Schema for the User Response DTO.
 */
export const UserResponseDtoSchema = BaseEntitySchema.merge(
  UserSchema.pick({
    firstname: true,
    lastname: true,
    email: true,
    roles: true,
  }),
).partial()

/**
 * Interface for the User Response DTO.
 */
export interface IUserResponseDto
  extends z.infer<typeof UserResponseDtoSchema> {}
