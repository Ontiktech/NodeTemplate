import { createUserId } from '../utils/id.utils';
import { Request } from 'express';
import { UserRepository } from '../db/rdb/repositories/user.repository';
import { mapToUserModel } from '../mapper/user.mapper';
import { hashPassword } from '../utils/password.utils';
import { AuthProviders } from '../constants/enums';
import { deleteMultipleFileLocal } from '../middleware/fileUploadLocal.middleware';
import { CustomException } from '../errors/CustomException.error';
import { NotFoundException } from '../errors/NotFoundException.error';

export class TestService {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  async createUserWithImages(
    username: string,
    password: string,
    email: string,
    images: string[],
  ) {
    const id = createUserId();
    const hashedPassword = await hashPassword(password);
    const newUser = mapToUserModel(
      id,
      username,
      email,
      hashedPassword,
      '',
      '',
      '',
      AuthProviders.PHONE,
      images,
    );
    const rdsUser = await this.userRepo.createUser(newUser);
    return {
      user: rdsUser,
    };
  }

  async deleteUserWithImages(req: Request, id: string) {
    const rdsUser = await this.userRepo.findUser(id);
    if (!rdsUser) throw new NotFoundException('User with given ID not found !');

    deleteMultipleFileLocal(req, rdsUser.images);
    const result = await this.userRepo.deleteById(id);

    if (!result)
      throw new CustomException('Failed to delete! Please try again.', 500);

    return {
      message: 'User deleted successfully!',
      statusCode: 200,
      data: rdsUser,
    };
  }
}
