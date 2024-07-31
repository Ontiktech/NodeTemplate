import { UserMongo } from 'types/user.type';
import UserModel from '../model/user.model'

export class UserMongoRepository {
    async getUser(email: string) {
        const user = await UserModel.findOne({ email: email });
        return user
    }

    async createUser(user: UserMongo) {
        await UserModel.create(user);
    }
}