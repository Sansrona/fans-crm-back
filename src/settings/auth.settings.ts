import { IsString } from 'class-validator';
import { EnvironmentVariable } from './configuration';

export class AuthSettings {
  constructor(private environmentVariables: EnvironmentVariable) {}
  @IsString()
  JWT_SECRET_KEY = this.environmentVariables.JWT_SECRET_KEY;
  @IsString()
  JWT_ACCESS_EXPIRATION_TIME =
    this.environmentVariables.JWT_ACCESS_EXPIRATION_TIME;
}
