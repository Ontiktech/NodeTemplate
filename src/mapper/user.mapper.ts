import {
  Company,
  User,
  UserDetails,
} from '../db/rdb/repositories/user.repository';
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
  };
}

// export function mapToUserDetails(
//     userId
// ): UserDetails (
//     return {

//     }
// )

export function mapToCompanyModel(
  id: string,
  userId: string,
  name: string,
  type?: string,
  address?: string,
  tradeLicenseNo?: string,
): Company {
  return {
    id: id,
    userId: userId,
    name: name,
    type: type,
    address: address,
    tradeLicenseNo: tradeLicenseNo,
  };
}
