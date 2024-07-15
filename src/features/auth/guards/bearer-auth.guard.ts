import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { UsersRepository } from '../../users/db/users.repository';
import { AuthSettings } from '../../../settings/auth.settings';

@Injectable()
export class BearerAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private usersRepo: UsersRepository,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const authSettings: AuthSettings = this.configService.get('authSettings', {
      infer: true,
    });
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: authSettings.JWT_SECRET_KEY,
      });

      if (payload.userId) {
        const user = await this.usersRepo.getUserById(payload.userId);
        if (user) {
          request['owner'] = {
            id: user.id,
            email: user.email,
          };
        }
        return true;
      }
    } catch {
      throw new UnauthorizedException();
    }
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
