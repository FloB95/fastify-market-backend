import { z } from 'zod'

export const BaseEntitySchema = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date().nullable().default(null),
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
  public createdAt: Date = new Date()
  public updatedAt: Date | null = null

  constructor(id: string) {
    this.id = id
  }

  setCreatedAt(date: Date) {
    this.createdAt = date
  }

  setUpdatedAt(date: Date | null) {
    this.updatedAt = date
  }
}
