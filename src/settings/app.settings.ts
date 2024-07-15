import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { useContainer } from 'class-validator';
import {
  AllExceptionsFilter,
  DomainExceptionsFilter,
} from '../common/exceptions/http-exception.filter';
import { AppModule } from '../app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { errorFormatter } from '../common/exceptions/error-formatter';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ApiSettingsType } from './configuration';
import { BadRequestError } from '../common/exceptions/custom-errors/bad-request.exception';

const configSwagger = new DocumentBuilder()
  .setTitle('Fans-crm')
  .setDescription('Fans CRM API')
  .setVersion('0.1')
  .build();

const getSettingsForCors = (
  apiSettings: ApiSettingsType,
  isNonProduction: boolean,
) => {
  const origin = apiSettings.PUBLIC_FRIEND_FRONT_URL.split(',');
  if (isNonProduction) {
    origin.push(
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:5173',
    );
  }

  return origin;
};

const swaggerSetup = (app: INestApplication, apiSettings: ApiSettingsType) => {
  const SWAGGER_PATH = apiSettings.SWAGGER_PATH;

  const document = SwaggerModule.createDocument(app, configSwagger);

  SwaggerModule.setup(SWAGGER_PATH, app, document);
};

const addGlobalPipeToApp = (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (errors) => {
        const messages = errorFormatter(errors);
        throw new BadRequestError('validation error', messages);
      },
    }),
  );
};

const addGlobalFilterToApp = async (
  app: INestApplication,
  isNonProduction: boolean,
) => {
  app.useGlobalFilters(new AllExceptionsFilter(isNonProduction));
  app.useGlobalFilters(new DomainExceptionsFilter());
};

const getCorsOptions = (origins: string[]): CorsOptions => ({
  origin: origins,
  credentials: true,
});

export const appSettings = async (
  app: INestApplication,
  apiSettings: ApiSettingsType,
  isNonProduction: boolean,
) => {
  app.use(cookieParser());
  await addGlobalFilterToApp(app, isNonProduction);
  app.setGlobalPrefix('api');
  addGlobalPipeToApp(app);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const origin = getSettingsForCors(apiSettings, isNonProduction);
  app.use(cookieParser());

  app.enableCors(getCorsOptions(origin));

  if (isNonProduction) {
    swaggerSetup(app, apiSettings);
  }
};
