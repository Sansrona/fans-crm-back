import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {appSettings} from "./settings/app.settings";
import {ConfigService} from "@nestjs/config";
import {ConfigurationType} from "./settings/configuration";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1')
  const configService = app.get(ConfigService<ConfigurationType, true>);
  const apiSettings = configService.get('apiSettings', { infer: true });
  const environmentSettings = configService.get('environmentSettings', {
    infer: true,
  });
  await appSettings(app, apiSettings, environmentSettings.isNonProduction);
  const PORT = apiSettings.PORT;
  await app.listen(PORT, () => {
    console.log('Server started on PORT:', PORT);
    console.log('ENV', environmentSettings.currentEnv);
  });
}
bootstrap();
