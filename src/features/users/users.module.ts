import { Module } from '@nestjs/common';
import { UsersController } from './api/users.controller';
import {usersProviders} from "./entities/users.providers";
import {CreateUserHandler} from "./app/create-user.command";

const commandHandlers = [
    CreateUserHandler
]

@Module({
  controllers: [UsersController],
  providers: [...usersProviders, ...commandHandlers],
})
export class UsersModule {}
