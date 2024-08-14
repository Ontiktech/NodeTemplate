import { verify, sign, TokenExpiredError } from 'jsonwebtoken';
import { getEnvVar } from '../utils/common.utils';
import { UserPayload } from '../schema/token-payload.schema';
import { Response, Request, NextFunction } from 'express';

export class JwtMiddleware {
  private JWT_SECRET: string;
  private JWT_EXPIRY: string;

  constructor() {
    this.JWT_SECRET = getEnvVar('JWT_SECRET');
    this.JWT_EXPIRY = getEnvVar('JWT_EXPIRY');
  }

  generateToken(payload: UserPayload): string {
    return sign(payload, this.JWT_SECRET, { expiresIn: this.JWT_EXPIRY });
  }

  verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization;

      if (token == null) {
        res.sendStatus(401);
        return;
      }
      const payload = verify(token, this.JWT_SECRET);
      if (payload) {
        console.log('payload', payload);
        next();
      } else {
        throw new TokenExpiredError('Token Expired', new Date());
      }
    } catch (error) {
      res.sendStatus(403);
    }
  }
}
