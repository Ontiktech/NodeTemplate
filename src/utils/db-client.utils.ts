import { Sequelize } from 'sequelize';

export function getDBClient(
  dbName: string,
  username: string,
  password: string,
  endpoint: string,
): Sequelize {
  if(process.env.APP_ENV === 'local'){
    return new Sequelize(dbName, username, password, {
      host: endpoint,
      dialect: 'postgres',
      dialectModule: require('pg'),
      ssl: false,
      // // dialectOptions: {
      // //   ssl: {
      // //     require: true,
      // //   },
      // // },
      // // define: {
      // //   freezeTableName: true,
      // // },
      // // pool: {
      // //   max: 2,
      // //   min: 0,
      // //   idle: 0,
      // //   acquire: 3000,
      // //   evict: 3000,
      // // },
    });
  }
  else{
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
}
