import { type z } from 'zod'
import { PaginationResponseDtoSchema } from '../IPaginationDto'
import { UserResponseDtoSchema } from './IUserResponseDto'

/**
 * Schema for the User Pagination Response DTO.
 */
export const UserPaginationResponseSchema = PaginationResponseDtoSchema(
  UserResponseDtoSchema,
)

/**
 * Interface for the User Paginated Response DTO.
 */
export interface IUserPaginatedResponseDto
  extends z.infer<typeof UserPaginationResponseSchema> {}
