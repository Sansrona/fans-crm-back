import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {Sequelize} from "sequelize-typescript";
import {UsersEntity} from "../features/users/entities/users.entity";
import {ConfigurationType} from "../settings/configuration";

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (configService: ConfigService<ConfigurationType, true>) => {
            const dbSettings = configService.get('databaseSettings', {
                infer: true,
            });
            const sequelize = new Sequelize({
                dialect: 'mysql',
                host: dbSettings.DB_HOST,
                port: dbSettings.DB_PORT,
                username: dbSettings.DB_USER,
                password: dbSettings.DB_PASSWORD,
                database: dbSettings.DB_NAME,
            })
            sequelize.addModels([UsersEntity]);
            await sequelize.sync();
            return sequelize;
        },
        inject: [ConfigService]
    },
];
@Module({
    providers: [...databaseProviders],
    exports: [...databaseProviders],
})
export class DbModule {}
