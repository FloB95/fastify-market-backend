import { type z } from 'zod'
import { UserSchema } from '../../domain/entities/User'
import { BaseDtoCreateOmitFields } from '~/core/domain/entities/BaseEntity'
import zodToJsonSchema from 'zod-to-json-schema'
import { UserResponseDtoSchema } from './UserResponseDto'
import { DefaultIdQueryParamSchema } from '~/core/domain/dto/BaseRequestDto'

export const CreateUserDtoSchema = UserSchema.omit(BaseDtoCreateOmitFields)
export const UpdateUserDtoSchema = UserSchema.partial().omit(
  BaseDtoCreateOmitFields,
)
export interface ICreateUserDto extends z.infer<typeof CreateUserDtoSchema> {}
export interface IUpdateUserDto extends z.infer<typeof UpdateUserDtoSchema> {}

export const GetUserJsonSchema = zodToJsonSchema(CreateUserDtoSchema, {
  $refStrategy: 'none',
  definitions: {
    params: DefaultIdQueryParamSchema,
    response: UserResponseDtoSchema,
  },
})

export const CreateUserJsonSchema = zodToJsonSchema(CreateUserDtoSchema, {
  $refStrategy: 'none',
  definitions: {
    body: CreateUserDtoSchema,
    response: UserResponseDtoSchema,
  },
})

export const UpdateUserJsonSchema = zodToJsonSchema(UpdateUserDtoSchema, {
  $refStrategy: 'none',
  definitions: {
    params: DefaultIdQueryParamSchema,
    body: UpdateUserDtoSchema,
    response: UserResponseDtoSchema,
  },
})

export const DeleteUserJsonSchema = zodToJsonSchema(UpdateUserDtoSchema, {
  $refStrategy: 'none',
  definitions: {
    params: DefaultIdQueryParamSchema,
  },
})
