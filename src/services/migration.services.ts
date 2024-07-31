import { UserRepository } from '../db/rdb/repositories/user.repository';

export class MigrationService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async authentication() {
    await this.userRepository.testConnection();
  }

  async migrate() {
    await this.userRepository.runMigration();
  }
}
