import { Sequelize } from "sequelize-typescript";
import config from "../config/config.json";
import Account from "../models/Account";
import User from "../models/User";
type Mode = "development" | "test" | "production";
type Dialect =
  | "mysql"
  | "postgres"
  | "sqlite"
  | "mariadb"
  | "mssql"
  | "db2"
  | "snowflake"
  | "oracle";

const sequelizeMode: Mode = config.NODE_ENV as Mode;

let sequelizeInstance: Sequelize;

const database = {
  init: async () => {
    if (sequelizeInstance) return sequelizeInstance;

    sequelizeInstance = new Sequelize({
      dialect: config[sequelizeMode].dialect as Dialect,
      database: config[sequelizeMode].database,
      username: config[sequelizeMode].username,
      password: config[sequelizeMode].password || undefined,
      host: config[sequelizeMode].host,
      port: parseInt(config[sequelizeMode].port) || 3306, // Default port if not provided
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
      models: [User, Account],
      logging: false,
    });

    try {
      await sequelizeInstance.authenticate();
      await sequelizeInstance.sync();
      console.log("[database]: Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  },
};

export default database;
