import { UserService } from '../services/user.services';
import { Request, Response, NextFunction } from 'express';

const userService = new UserService();

export async function getUser(req: Request, res: Response) {
  const user = userService.findUser(req.body.id);
  res.send({
    user,
  });
}

export async function getUserDetails(req: Request, res: Response) {
  const userId = req.params.userId;
  const userDetails = userService.findUserDetails(userId);
  res.send({
    details: userDetails,
  });
}

export async function addUserDetails(req: Request, res: Response) {}

export async function updateUserDetails(req: Request, res: Response) {}

export async function createCompany(req: Request, res: Response) {
  const { userId, name, type, address, tradeLicenseNo } = req.body;
  try {
    await userService.createCompany(
      userId,
      name,
      type,
      address,
      tradeLicenseNo,
    );
    res.send({
      message: 'Created Successfully',
      successful: true,
    });
  } catch (error: any) {
    res.send({
      message: 'failed',
      success: false,
      error: error,
    });
  }
}

export async function getCompany(req: Request, res: Response) {
  const userId = req.query.userId as string;
  const company = await userService.getUserCompany(userId);
  res.send({
    messgae: 'fetch successful',
    success: true,
    company: company,
  });
}
