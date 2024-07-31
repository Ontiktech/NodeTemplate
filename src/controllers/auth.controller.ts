import { AuthService } from '../services/auth.services';
import { Request, Response } from 'express';
import { generateToken } from '../utils/jwt.utils';

const authService = new AuthService();

export async function authenticate(req: Request, res: Response) {
  console.log('request:', req.body);

  const response = await authService.authenticate(req.body);
  console.log('response', response);
  if (
    response.authenticated &&
    response.userInfo &&
    response.userInfo.username !== undefined &&
    response.userInfo.types !== undefined
  ) {
    const token = generateToken({
      username: response.userInfo.username,
      type: response.userInfo.types,
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
