import { sign, verify } from 'jsonwebtoken'
import { injectable, singleton } from 'tsyringe'
import { type IJwtService } from '~/core/application/services/IJwtService'

@injectable()
@singleton()
export class JwtService implements IJwtService {
  generateToken(payload: string | object, expiresIn?: number | string): string {
    return sign(payload, process.env.API_SECRET || 'test', {
      expiresIn: expiresIn || '1d',
    })
  }

  verifyToken(token: string): boolean | string | object {
    try {
      return verify(token, process.env.API_SECRET || 'test') as
        | boolean
        | string
        | object
    } catch (error) {
      return false
    }
  }
}
