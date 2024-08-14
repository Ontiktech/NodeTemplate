import { JwtMiddleware } from '../middleware/jwt.middleware';
import { AuthService } from '../services/auth.services';
import { Request, Response } from 'express';

const jwtMiddleware = new JwtMiddleware()
const authService = new AuthService();

export async function authenticate(req: Request, res: Response) {
  console.log('request:', req.body);

  const response = await authService.authenticate(req.body);
  console.log('response', response);
  if (response.authenticated && response.userInfo) {
    const token = jwtMiddleware.generateToken({
      value: 'VALUE WE WANT',
    });
    res.send({
      userInfo: response.userInfo,
      token: token,
    });
  } else {
    res.sendStatus(401).send({
      message: response.message,
    });
  }
}
