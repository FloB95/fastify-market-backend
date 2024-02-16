import { z } from 'zod'
import { BaseEntity, BaseEntitySchema } from '~/core/domain/BaseEntity'

export const UserSchema = z.object({
  ...BaseEntitySchema.shape,
  firstname: z.string().min(3).max(50),
  lastname: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(255),
})

export class User extends BaseEntity {
  constructor(
    public readonly id: string,
    public readonly firstname: string,
    public readonly lastname: string,
    public readonly email: string,
    public readonly password: string,
  ) {
    super(id)
  }
}
