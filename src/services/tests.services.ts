import { createUserId } from '../utils/id.utils';
import {
  UserRepository,
} from '../db/rdb/repositories/user.repository';
import { mapToUserModel } from '../mapper/user.mapper';
import { hashPassword } from '../utils/password.utils';
import { AuthProviders } from '../constants/enums';

export class TestService {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  async createUserWithImages(username: string, password: string, email: string, images: string[]|null) {
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
      images
    )
    const rdsUser = await this.userRepo.createUser(newUser)
    return {
      user: rdsUser,
    }
  }
}
