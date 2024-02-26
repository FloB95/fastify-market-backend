import { type z } from 'zod'
import { PaginationResponseDtoSchema } from '../IPaginationDto'
import { UserResponseDtoSchema } from './IUserResponseDto'

export const UserPaginationResponseSchema = PaginationResponseDtoSchema(
  UserResponseDtoSchema,
)

export interface IUserPaginatedResponseDto
  extends z.infer<typeof UserPaginationResponseSchema> {}
