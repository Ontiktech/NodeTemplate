import { AuthProviders, RateTypes, UserRoles, UserTypes } from "../../../constants/enums";
import { UserClient } from "../../../db/clients/postgres.client";
import { 
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Sequelize
 } from "sequelize";


 const sequelize = UserClient.getInstance()

class UserModel extends Model<
    InferAttributes<UserModel>,
    InferCreationAttributes<UserModel>
>  {
    declare id: string
    declare username?: string
    declare email?: string
    declare password?: string
    declare phone?: string
    declare roles?: [string]
    declare types?: [string]
    declare providers?: [string]
    declare token?: string
}

UserModel.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        unique: true
    }, 
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type:DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING
    },
    roles: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    types: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    providers: {
        type: DataTypes.JSON,
        defaultValue: []
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: "User",
    sequelize,
    timestamps: true,
})

class UserDetailsModel extends Model<
    InferAttributes<UserDetailsModel>,
    InferCreationAttributes<UserDetailsModel>
>  {
    declare userId: string
    declare fullName: string
    declare dob: string
    declare profession: string
    declare designation: string
    declare history: JSON
    declare address: string
    declare country: string
    declare rate: number
    declare rateType: string
    declare token: string
}

UserDetailsModel.init({
    userId: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    fullName: {
        type: DataTypes.STRING
    },
    dob: {
        type: DataTypes.STRING
    },
    profession: {
        type: DataTypes.STRING,
    },
    designation: {
        type:DataTypes.STRING,
    },
    history: {
        type:DataTypes.JSON,
    },
    address: {
        type:DataTypes.STRING,
    },
    country: {
        type:DataTypes.STRING,
        allowNull: false
    },
    rate: {
        type: DataTypes.DECIMAL
    },
    rateType: {
        type: DataTypes.ENUM(RateTypes.DAILY, RateTypes.HOURLY, RateTypes.WEEKLY, RateTypes.MONTHLY)
    },
    token: {
        type: DataTypes.STRING
    }
}, {
    tableName: "UserDetails",
    sequelize,
    timestamps: true,
})

class CompanyModel extends Model {
    declare id: string
    declare userId: string
    declare name: string
    declare type?: string
    declare address?: string
    declare tradeLicenseNo?: string
}

CompanyModel.init({
   id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
   },
   userId: {
    type: DataTypes.STRING,
    allowNull: false
   },
   name: {
    type: DataTypes.STRING,
    allowNull: false
   },
   type: {
    type: DataTypes.STRING,
    allowNull: true
   },
   address: {
    type: DataTypes.STRING,
   },
   tradeLicenseNo: {
    type: DataTypes.STRING,
    allowNull: true
   }
}, {
    tableName: "Company",
    sequelize,
    timestamps: true,
})



export {
    UserModel,
    UserDetailsModel,
    CompanyModel
}