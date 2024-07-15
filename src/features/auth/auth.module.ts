import { Module } from '@nestjs/common';
import { AuthController } from './api/auth.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthSettings } from '../../settings/auth.settings';
import { LoginUserHandler } from './app/use-cases/login-user.command';
import { CreateAccessTokenHandler } from './app/use-cases/create-access-token.command';
import { UsersRepository } from '../users/db/users.repository';
import { UserHashingManager } from '../../common/adapters/user-hashing.adapter';

const commandHandlers = [
  LoginUserHandler,
  CreateAccessTokenHandler,

];

const repos = [
  UsersRepository,
];
@Module({
  imports: [
    CqrsModule,
    UsersModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => {
        const authSettings: AuthSettings = configService.get('authSettings');
        return {
          secret: authSettings.JWT_SECRET_KEY,
          signOptions: { expiresIn: authSettings.JWT_ACCESS_EXPIRATION_TIME },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [UserHashingManager, ...repos, ...commandHandlers],
})
export class AuthModule {}
