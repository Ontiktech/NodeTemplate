import { UserClient } from "../../../db/clients/postgres.client";
import { Sequelize } from "sequelize";
import { UserDetailsModel, UserModel } from "../models/user.model";
import { User } from "types/user.type";

export class UserRepository {
    private sequelize: Sequelize

    constructor() {
        this.sequelize = UserClient.getInstance()
    }

    async testConnection() {
        await this.sequelize.authenticate()
    }

    async runMigration() {
        await this.sequelize.sync({force: true})
    }

    async createUser(user: User): Promise<User> {
        const createdUser = await UserModel.create(user)
        return createdUser
    }

    async findUser(id: string): Promise<User> {
        return await UserModel.findOne({
            where: {
                id: id
            }
        }) as unknown as User
    }

    async getUserDetails(userId: string) {
        return await UserDetailsModel.findOne({
            where: {
                userId: userId
            }
        })
    }

    async findUserByEmail(email: string): Promise<User> {
        return await UserModel.findOne({
            where: {
                email: email
            }
        }) as unknown as User
    }

    async findUserByPhone(phone: string): Promise<User> {
        return await UserModel.findOne({
            where: {
                phone: phone
            }
        }) as unknown as User
    }

    async findByProvider(username: string): Promise<User> {
        return await UserModel.findOne({
            where: {
                username: username
            }
        }) as unknown as User
    }

    async deleteById(id: string): Promise<User> {
      return await UserModel.destroy({
          where: {
              id: id
          }
      }) as unknown as User
  }
}
