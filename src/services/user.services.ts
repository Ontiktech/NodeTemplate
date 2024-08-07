import { UserRepository } from '../db/rdb/repositories/user.repository';

import { UserMongoRepository } from '../db/nosql/repository/user.repository';
import { mapToMongoUser } from '../mapper/user.mapper';

export class UserService {
  private userRepo: UserRepository;
  private userMongoRepo: UserMongoRepository;

  constructor() {
    this.userRepo = new UserRepository();
    this.userMongoRepo = new UserMongoRepository();
  }

  async findUser(id: string) {
    return await this.userRepo.findUser(id);
  }

  async findUserDetails(userId: string) {
    return await this.userRepo.getUserDetails(userId);
  }

  async getMongoUser(email: string) {
    return await this.userMongoRepo.getUser(email);
  }

  async createMongoUser(email: string, name: string) {
    const user = mapToMongoUser(email, name);
    await this.userMongoRepo.createUser(user);
  }
}
