import { z } from 'zod'
import { BaseEntitySchema } from '../../entities/BaseEntity'

// UserResponseDto to remove thinks like passwords and other sensitive data
export const UserResponseDtoSchema = z
  .object({
    ...BaseEntitySchema.shape,
    firstname: z.string(),
    lastname: z.string(),
    email: z.string(),
  })
  .partial()

export interface IUserResponseDto
  extends z.infer<typeof UserResponseDtoSchema> {}
