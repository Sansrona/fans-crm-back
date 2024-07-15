import { IsNumber, IsString } from 'class-validator';
import { EnvironmentVariable } from './configuration';

export class ApiSettings {
  constructor(private environmentVariables: EnvironmentVariable) {}
  @IsNumber()
  PORT: number = Number.parseInt(this.environmentVariables.PORT);
  @IsString()
  LOCAL_HOST: string = this.environmentVariables.LOCAL_HOST;
  @IsString()
  PUBLIC_FRIEND_FRONT_URL: string =
    this.environmentVariables.PUBLIC_FRIEND_FRONT_URL;
  @IsString()
  SWAGGER_PATH: string = this.environmentVariables.SWAGGER_PATH;
  @IsNumber()
  THROTTLER_LIMIT = +this.environmentVariables.THROTTLER_LIMIT;
  @IsNumber()
  THROTTLER_TIME = +this.environmentVariables.THROTTLER_TIME;
}
