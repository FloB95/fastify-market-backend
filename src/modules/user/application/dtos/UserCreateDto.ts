import { type z } from 'zod'
import { UserSchema } from '../../domain/entities/User'
import { BaseDtoCreateOmitFields } from '~/core/domain/BaseEntity'
import zodToJsonSchema from 'zod-to-json-schema'
import { UserResponseDtoSchema } from './UserResponseDto'

export const CreateUserDtoSchema = UserSchema.omit(BaseDtoCreateOmitFields)
export interface ICreateUserDto extends z.infer<typeof CreateUserDtoSchema> {}

export const CreateUserJsonSchema = zodToJsonSchema(CreateUserDtoSchema, {
  $refStrategy: 'none',
  definitions: {
    body: CreateUserDtoSchema,
    response: UserResponseDtoSchema,
  },
})
