import { type z } from 'zod'
import { type RefreshTokenSchema } from '../../entities/RefreshToken'

/**
 * Interface for the RefreshTokenDto.
 * @interface
 * @extends z.infer<typeof RefreshTokenSchema>
 */
export interface IRefreshTokenDto extends z.infer<typeof RefreshTokenSchema> {}
