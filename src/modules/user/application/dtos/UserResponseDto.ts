import { z } from 'zod'
import zodToJsonSchema from 'zod-to-json-schema'
import { BaseEntitySchema } from '~/core/domain/entities/BaseEntity'
import { PaginationResponseSchema } from '~/core/domain/dto/BaseResponseDto'
import { GetUsersQueryParamsSchema } from './UsersRequestDto'

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

export const UserPaginationResponseSchema = PaginationResponseSchema(
  UserResponseDtoSchema,
)

export const UserPaginationResponseJsonSchema = zodToJsonSchema(
  UserPaginationResponseSchema,
  {
    $refStrategy: 'none',
    definitions: {
      querystring: GetUsersQueryParamsSchema,
      response: UserPaginationResponseSchema,
    },
  },
)
