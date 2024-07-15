import { Module } from '@nestjs/common';
import { UsersController } from './api/users.controller';
import {usersProviders} from "./entities/users.providers";
import {CreateUserHandler} from "./app/create-user.command";
import {UserHashingManager} from "../../common/adapters/user-hashing.adapter";
import {UsersRepository} from "./db/users.repository";
import {UsersQueryRepository} from "./db/users.query-repository";
import {Sequelize} from "sequelize-typescript";
import {UsersEntity} from "./entities/users.entity";
import {SequelizeModule} from "@nestjs/sequelize";

const commandHandlers = [
    CreateUserHandler
]
const repos = [
    UsersRepository, UsersQueryRepository
]

@Module({
    imports: [SequelizeModule.forFeature([UsersEntity])],
  controllers: [UsersController],
  providers: [UserHashingManager,...usersProviders, ...commandHandlers, ...repos],
})
export class UsersModule {}
