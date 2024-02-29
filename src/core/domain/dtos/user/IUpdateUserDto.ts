import { type z } from 'zod'
import { UserSchema } from '../../entities/User'
import { BaseDtoOmitFields } from '../IBaseDtoOmitFields'

/**
 * Schema for the Update User DTO.
 */
export const UpdateUserDtoSchema = UserSchema.partial().omit(BaseDtoOmitFields)

/**
 * Interface for the Update User DTO.
 */
export interface IUpdateUserDto extends z.infer<typeof UpdateUserDtoSchema> {}
