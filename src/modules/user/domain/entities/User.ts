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
    public firstname: string,
    public lastname: string,
    public email: string,
    public password: string,
  ) {
    super(id)
  }
}
