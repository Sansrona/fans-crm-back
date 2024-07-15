import {Controller, Get, Post, Body, Param,ParseIntPipe} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {CommandBus} from "@nestjs/cqrs";
import {UsersQueryRepository} from "../db/users.query-repository";
import {CreateUserCommand} from "../app/create-user.command";

@Controller('users')
export class UsersController {
  constructor(private readonly commandBus: CommandBus, private usersQueryRepo: UsersQueryRepository) {}

  @Post('add-user')
  create(@Body() createUserDto: CreateUserDto) {
    return this.commandBus.execute(new CreateUserCommand(createUserDto));
  }

  @Get('get-user/:id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersQueryRepo.getUserById(id);
  }


}
