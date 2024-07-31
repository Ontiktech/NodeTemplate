import { Sequelize } from 'sequelize';

export function getDBClient(
  dbName: string,
  username: string,
  password: string,
  endpoint: string,
): Sequelize {
  return new Sequelize(dbName, username, password, {
    host: endpoint,
    dialect: 'postgres',
    dialectModule: require('pg'),
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
      },
    },
    define: {
      freezeTableName: true,
    },
    pool: {
      max: 2,
      min: 0,
      idle: 0,
      acquire: 3000,
      evict: 3000,
    },
  });
}
