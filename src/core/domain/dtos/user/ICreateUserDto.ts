import { type z } from 'zod'
import { UserSchema } from '../../entities/User'
import { BaseDtoOmitFields } from '../IBaseDtoOmitFields'

/**
 * Schema for the Create User DTO.
 */
export const CreateUserDtoSchema = UserSchema.omit({
  ...BaseDtoOmitFields,
}).extend({
  roles: UserSchema.shape.roles.optional(),
})

/**
 * Interface for the Create User DTO.
 */
export interface ICreateUserDto extends z.infer<typeof CreateUserDtoSchema> {}
