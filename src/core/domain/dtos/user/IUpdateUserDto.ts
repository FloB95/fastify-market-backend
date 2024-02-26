import { type z } from 'zod'
import { UserSchema } from '../../entities/User'
import { BaseDtoOmitFields } from '../IBaseDtoOmitFields'

export const UpdateUserDtoSchema = UserSchema.partial().omit(BaseDtoOmitFields)
export interface IUpdateUserDto extends z.infer<typeof UpdateUserDtoSchema> {}
