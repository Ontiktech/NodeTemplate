import { UserClient } from "../../../db/clients/postgres.client";
import { 
    Model,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
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
    declare images: string[] | null
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
    },
    images: {
      type: DataTypes.JSON,
      allowNull: true
    },
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
    declare address: string
    declare country: string
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
    address: {
        type:DataTypes.STRING,
    },
    country: {
        type:DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "UserDetails",
    sequelize,
    timestamps: true,
})



export {
    UserModel,
    UserDetailsModel
}