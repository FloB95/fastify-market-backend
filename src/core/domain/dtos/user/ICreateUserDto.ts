import { type z } from 'zod'
import { UserSchema } from '../../entities/User'
import { BaseDtoOmitFields } from '../IBaseDtoOmitFields'

export const CreateUserDtoSchema = UserSchema.omit(BaseDtoOmitFields)
export interface ICreateUserDto extends z.infer<typeof CreateUserDtoSchema> {}
