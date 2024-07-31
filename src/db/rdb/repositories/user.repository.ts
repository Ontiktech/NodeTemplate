import { UserClient } from "../../../db/clients/postgres.client";
import { InferAttributes, Sequelize } from "sequelize";
import { CompanyModel, UserDetailsModel, UserModel } from "../models/user.model";

export type User = InferAttributes<UserModel>
export type UserDetails = InferAttributes<UserDetailsModel>
export type Company = InferAttributes<CompanyModel>

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

    async createCompany(company: Company){
        await CompanyModel.create(company)
    }

    async getCompanyByUserID(userId: string) {
        return await CompanyModel.findAll({
            where: {
                userId: userId
            }
        })
    }

    async getAllCompanies() {
        return await CompanyModel.findAll()
    }
}
