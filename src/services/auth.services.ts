import { AuthProviders } from '../constants/enums';
import { UserRepository } from '../db/rdb/repositories/user.repository';
import { mapToMongoUser, mapToUserModel } from '../mapper/user.mapper';
import { hashPassword } from '../utils/password.utils';
import { createUserId } from '../utils/id.utils';
import { RegistrationRequestSchema } from '../schema/user.schema';
import { UserMongoRepository } from '../db/nosql/repository/user.repository';

export class AuthService {
  private userRepo: UserRepository;
  private userMongoRepo: UserMongoRepository;

  constructor() {
    this.userRepo = new UserRepository();
    this.userMongoRepo = new UserMongoRepository();
  }

  async authenticate(request: RegistrationRequestSchema) {
    let userInfo  = null
    if (
      request.email &&
      request.password &&
      request.username &&
      request.email !== '' &&
      request.password !== ''
    ) {
      userInfo = await this.loginWithEmail(request.email, request.password, request.username)
    } else if (request.phone && request.username && request.phone !== '') {
      userInfo = await this.loginWithPhone(request.phone, request.username);
    } else {
      return {
        userInfo: null,
        authenticated: false,
        message: 'invalid request',
      };
    }
    return {
      userInfo: userInfo,
      authenticated: true,
    };
  }

  async loginWithEmail(email: string, password: string, username: string) {
    const user = await this.userRepo.findUserByEmail(email);
    const id = createUserId();
    if (!user) {
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
      )
      const newMongoUser = mapToMongoUser(email, username)
      const rdsUser = await this.userRepo.createUser(newUser)
      const mongoUser = await this.userMongoRepo.createUser(newMongoUser)
      return {
        user: rdsUser,
        otherUser: mongoUser
      }
    } else {
      return {
        user: user,
        otherUser: null
      };
    }
  }

  async loginWithPhone(phone: string, username: string) {
    const user = await this.userRepo.findUserByPhone(phone);
    const id = createUserId();
    console.log('user', user);
    if (!user) {
      const newUser = mapToUserModel(
        id,
        username,
        '',
        '',
        phone,
        '',
        '',
        AuthProviders.PHONE,
      );
      return await this.userRepo.createUser(newUser);
    } else {
      return {
        user: user,
        otherUser: null
      };
    }
  }
}
