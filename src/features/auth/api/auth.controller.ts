import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  UseGuards,
  HttpCode,
  Get,
  Req,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Response, Request } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthLoginDto } from './dto/auth-login.dto';
import { LoginUserCommand } from '../app/use-cases/login-user.command';
import {
  SwaggerDecoratorForLoginUser,
  SwaggerDecoratorForMe,
} from '../swagger/decorators';

import { BearerAuthGuard } from '../guards/bearer-auth.guard';
import { UserTypes } from '../../../types/user.types';

import {User} from "../../../common/decorators/user.decorator";

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private commandBus: CommandBus) {}

  @Post('login')
  @SwaggerDecoratorForLoginUser()
  async login(
    @Body() authLoginDto: AuthLoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const note = await this.commandBus.execute(
      new LoginUserCommand(authLoginDto),
    );
    if (!note.hasError) {
      res.cookie(
        'refreshToken',
        note.data.refreshToken,
      );
      return { accessToken: note.data.accessToken };
    }
    return note;
  }






  @Get('me')
  @UseGuards(BearerAuthGuard)
  @ApiBearerAuth()
  @SwaggerDecoratorForMe()
  async getMe(@User() user: UserTypes) {
    return user;
  }

}
