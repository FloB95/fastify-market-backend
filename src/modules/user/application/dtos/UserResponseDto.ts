import { type z } from 'zod'
import { UserSchema } from '../../domain/entities/User'

export const UserResponseDtoSchema = UserSchema.omit({ password: true })
export interface IUserResponseDto
  extends z.infer<typeof UserResponseDtoSchema> {}
