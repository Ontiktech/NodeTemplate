import { UserMongo, User } from '../types/user.type';
import { AuthProviders, UserRoles, UserTypes } from '../constants/enums';

export function mapToUserModel(
  id: string,
  username: string,
  email: string,
  password: string,
  phone: string,
  roles: string,
  types: string,
  providers: string,
  images: string[],
): User {
  return {
    id: id,
    username: username ? username : '',
    email: email ? email : '',
    password: password ? password : '',
    phone: phone ? phone : '',
    roles: roles ? [roles] : [UserRoles.DEFAULT],
    types: types ? [types] : [UserTypes.DEFAULT],
    providers: providers ? [providers] : [AuthProviders.EMAIL],
    images: images,
  };
}

export function mapToMongoUser(email: string, name: string): UserMongo {
  return {
    email: email,
    name: name,
  };
}
