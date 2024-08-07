import { UserDetailsModel, UserModel } from 'db/rdb/models/user.model';
import { InferAttributes } from 'sequelize';

export type UserMongo = {
  email: string;
  name: string;
};

export type User = InferAttributes<UserModel>;
export type UserDetails = InferAttributes<UserDetailsModel>;
