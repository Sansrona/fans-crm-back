import { IsNumber, IsString } from 'class-validator';
import { EnvironmentVariable } from './configuration';

export class DatabaseSettings {
  constructor(private environmentVariables: EnvironmentVariable) {}
  @IsString()
  DB_HOST: string = this.environmentVariables.DB_HOST;
  @IsNumber()
  DB_PORT: number = Number.parseInt(this.environmentVariables.DB_PORT);
  @IsString()
  DB_NAME: string = this.environmentVariables.DB_NAME;
  @IsString()
  DB_USER: string = this.environmentVariables.DB_USER;
  @IsString()
  DB_PASSWORD: string = this.environmentVariables.DB_PASSWORD;

}
