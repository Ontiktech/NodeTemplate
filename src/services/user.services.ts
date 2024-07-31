import {
  Company,
  User,
  UserRepository,
} from '../db/rdb/repositories/user.repository';
import { mapToCompanyModel } from '../mapper/user.mapper';
import { createCompanyId } from '../utils/id.utils';

export class UserService {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  async findUser(id: string) {
    return await this.userRepo.findUser(id);
  }

  async findUserDetails(userId: string) {
    return await this.userRepo.getUserDetails(userId);
  }

  async getUserCompany(userId: string) {
    return await this.userRepo.getCompanyByUserID(userId);
  }

  async createCompany(
    userId: string,
    name: string,
    type?: string,
    address?: string,
    tradeLicenseNo?: string,
  ) {
    const companyId = createCompanyId();
    const company: Company = mapToCompanyModel(
      companyId,
      userId,
      name,
      type,
      address,
      tradeLicenseNo,
    );
    await this.userRepo.createCompany(company);
  }
}
