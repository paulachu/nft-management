import { ConfigService } from "@nestjs/config";
import { Sequelize } from "sequelize-typescript";
import { Dialect } from "sequelize/types";
export interface DatabaseConfig {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: Dialect;
}
export class DatabaseConfig {
    static getConfig(configService: ConfigService): DatabaseConfig
    {
        return {
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            dialect: 'postgres',
        };
    }
}