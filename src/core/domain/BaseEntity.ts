import { z } from 'zod'

export const BaseEntitySchema = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

type BaseDtoCreateOmitFields = {
  id?: true
  createdAt?: true
  updatedAt?: true
}

export const BaseDtoCreateOmitFields: BaseDtoCreateOmitFields = {
  id: true,
  createdAt: true,
  updatedAt: true,
}

export abstract class BaseEntity {
  public readonly id: string
  public readonly createdAt: Date = new Date()
  public readonly updatedAt: Date = new Date()

  constructor(id: string) {
    this.id = id
  }
}
