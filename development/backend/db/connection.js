import { Sequelize } from "sequelize";
import dotenv from "dotenv";
// import { CONFIGURATION } from "../config.js";

dotenv.config();

// const IS_DEV = true;
// const ENV = IS_DEV ? CONFIGURATION["DEVELOPMENT"] : CONFIGURATION["PRODUCTION"];

export const connection = new Sequelize(
  {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    dialect: "mysql",
    pool: {
      max: 3,
      min: 0,
      acquire: 10000,
      idle: 5000,
    },
    logging: false,
  }
  // `mysql://${ENV.DBUSERNAME}:${ENV.DBPASSWORD}@${ENV.DBHOST}:${ENV.DBPORT}/${ENV.DBNAME}`,
  // {
  //   dialect: ENV.DBDIALECT,
  //   pool: {
  //     max: 3,
  //     min: 0,
  //     acquire: 10000,
  //     idle: 5000,
  //   },
  //   logging: false,
  // }
);
