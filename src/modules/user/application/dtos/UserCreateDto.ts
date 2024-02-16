import { type z } from 'zod'
import { UserSchema } from '../../domain/entities/User'
import { BaseDtoCreateOmitFields } from '~/core/domain/BaseEntity'

export const CreateUserDtoSchema = UserSchema.omit(BaseDtoCreateOmitFields)
export interface ICreateUserDto extends z.infer<typeof CreateUserDtoSchema> {}
