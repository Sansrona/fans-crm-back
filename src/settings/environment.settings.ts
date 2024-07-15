import { IsEnum } from 'class-validator';
import { EnvironmentVariable } from './configuration';
import { Environments } from '../types/environment.types';

export class EnvironmentSettings {
  constructor(private environmentVariables: EnvironmentVariable) {}

  @IsEnum(Environments)
  private ENV = this.environmentVariables.ENV;

  get isProduction() {
    return this.ENV === Environments.PRODUCTION;
  }
  get isStaging() {
    return this.ENV === Environments.STAGING;
  }
  get isTesting() {
    return this.ENV === Environments.TEST;
  }
  get isDevelopment() {
    return this.ENV === Environments.DEVELOPMENT;
  }
  get isNonProduction() {
    return (
      this.ENV === Environments.STAGING ||
      this.ENV === Environments.TEST ||
      this.ENV === Environments.DEVELOPMENT
    );
  }
  get currentEnv() {
    return this.ENV;
  }
}
