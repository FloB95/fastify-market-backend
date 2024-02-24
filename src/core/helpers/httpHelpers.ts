import { type z } from 'zod'
import { type IHttpResponse } from '~/core/domain/http/Request'

export const makeApiHttpResponse = (
  statusCode: number,
  data: any,
  additionalHeaders: Record<string, never> = {},
): IHttpResponse => {
  return {
    statusCode,
    data: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      ...additionalHeaders,
    },
  }
}

export const convertQuerySelectToObj = (
  selectString: string,
  objSchema: z.ZodObject<any, any, any>,
): Record<string, boolean> | undefined => {
  const select: any = selectString
    ? selectString.split(',').reduce((acc, key) => {
        acc[key] = true
        return acc
      }, {})
    : undefined

  // remove all the keys that are not in the User entity
  if (select) {
    Object.keys(select).forEach((key) => {
      if (!(key in objSchema.shape)) {
        delete select[key]
      }
    })
  }

  return select && Object.entries(select).length > 0 ? select : undefined
}
