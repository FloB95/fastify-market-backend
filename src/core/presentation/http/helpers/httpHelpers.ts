import { type z } from 'zod'
import { type IHttpResponse } from '../interfaces/IResponse'

/**
 * Creates an HTTP response object.
 * @param statusCode The status code of the response.
 * @param data The data to be included in the response.
 * @param additionalHeaders Additional headers to be included in the response.
 * @returns An HTTP response object.
 */
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

/**
 * Converts a comma-separated string of keys into an object with those keys set to true.
 * @param selectString The comma-separated string of keys.
 * @param objSchema The schema object to compare the keys against.
 * @returns An object with keys from the selectString set to true, if they exist in objSchema.
 */
export const convertHttpSelectQueryToObj = (
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
