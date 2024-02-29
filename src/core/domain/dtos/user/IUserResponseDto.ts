import { z } from 'zod'
import { BaseEntitySchema } from '../../entities/BaseEntity'

/**
 * Schema for the User Response DTO.
 */
export const UserResponseDtoSchema = z
  .object({
    ...BaseEntitySchema.shape,
    firstname: z.string(),
    lastname: z.string(),
    email: z.string(),
  })
  .partial()

/**
 * Interface for the User Response DTO.
 */
export interface IUserResponseDto
  extends z.infer<typeof UserResponseDtoSchema> {}
