import { UserService } from '../services/user.services';
import { Request, Response } from 'express';

const userService = new UserService();

export async function getUser(req: Request, res: Response) {
  const email = req.query.email as string
  const user = userService.findUser(req.body.id);
  const mongoUser = userService.getMongoUser(email)
  res.send({
    user,
    mongoUser
  });
}

export async function getUserDetails(req: Request, res: Response) {
  const userId = req.params.userId;
  const userDetails = userService.findUserDetails(userId);
  res.send({
    details: userDetails,
  });
}
