import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { UsersModule } from './features/users/users.module';
import {ConfigModule} from "@nestjs/config";
import configuration, {validate} from "./settings/configuration";
import {Environments} from "./types/environment.types";

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration],
    validate,
    ignoreEnvFile:
        process.env.ENV !== Environments.DEVELOPMENT &&
        process.env.ENV !== Environments.TEST,
    envFilePath: ['.env.local', '.env.prod', '.env'],
  }),DbModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
