import { sign, TokenExpiredError } from 'jsonwebtoken';
import { getEnvVar } from './common.utils';
import { UserPayload } from '../schema/token-payload.schema';
import { Response, NextFunction } from 'express';

const JWT_SECRET = getEnvVar('JWT_SECRET');
const JWT_EXPIRY = getEnvVar('JWT_EXPIRY');

export function generateToken(payload: UserPayload): string {
  return sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
}

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
      res.sendStatus(401);
      return;
    }
    next();
  } catch (error) {
    res.sendStatus(403);
    throw new TokenExpiredError('Token Expired', new Date());
  }
}
