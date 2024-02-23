import { type z } from 'zod'
import { UserSchema } from '../../domain/entities/User'
import {
  PaginationOptionsSchema,
  PaginationResponseSchema,
} from '~/core/domain/repositories/BaseRepository'
import zodToJsonSchema from 'zod-to-json-schema'

export const UserResponseDtoSchema = UserSchema.omit({
  password: true,
}).partial()
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
      querystring: PaginationOptionsSchema,
      response: UserPaginationResponseSchema,
    },
  },
)
