import { verify, sign, TokenExpiredError } from 'jsonwebtoken';
import { getEnvVar } from './common.utils';
import { UserPayload } from '../schema/token-payload.schema';
import { Router, Response, NextFunction } from 'express';

const JWT_SECRET = getEnvVar('JWT_SECRET');
const JWT_EXPIRY = getEnvVar('JWT_EXPIRY');

export function generateToken(payload: UserPayload): string {
  return sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRY });
}

export function verifyToken(req: Request, res: any, next: NextFunction) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
      res.sendStatus(401);
      return;
    }
    const payload = verify(token, JWT_SECRET);
    res.user = payload;
    next();
  } catch (error) {
    res.sendStatus(403);
    throw new TokenExpiredError('Token Expired', new Date());
  }
}

export function refreshToken(
  oldToken: string,
  type: [string],
): Promise<string> {
  return new Promise((resolve, reject) => {
    verify(oldToken, JWT_SECRET, (err, user: any) => {
      if (err) {
        reject(err);
        return;
      }
      const payload: UserPayload = { username: user.username, type };
      const newToken = generateToken(payload);
      resolve(newToken);
    });
  });
}
