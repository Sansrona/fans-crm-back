import { HttpStatus } from '@nestjs/common';
import { NotificationExtension } from '../resultNotification';

type ErrorTemplateType = {
  message: string;
  extensions: NotificationExtension[];
};

export const SwaggerBadRequestErrorCreator = (
  extensions: NotificationExtension[] = [],
): ErrorTemplateType => ({
  message: 'Bad Request Exception',
  extensions,
});

export const SwaggerUnauthorizedErrorCreator = (
  message = 'Unauthorized Exception',
  extensions: NotificationExtension[] = [],
): ErrorTemplateType => ({
  message,
  extensions,
});

export const DefaultTooManyRequestSwaggerOption = {
  status: HttpStatus.TOO_MANY_REQUESTS,
  description: 'too many request',
};

export const DefaultNoContentResponseSwaggerOption = {
  status: HttpStatus.NO_CONTENT,
  description: 'Success',
};

export const DefaultBadRequestSwaggerOption = (
  errorExample: ErrorTemplateType,
) => ({
  status: HttpStatus.BAD_REQUEST,
  description: 'Bad request',
  content: {
    'application/json': {
      example: errorExample,
    },
  },
});

export const DefaultUnauthorizedRequestSwaggerOption = (
  errorExample: ErrorTemplateType,
) => ({
  status: HttpStatus.UNAUTHORIZED,
  description: 'Unauthorized',
  content: {
    'application/json': {
      example: errorExample,
    },
  },
});

export const DefaultOkRequestSwaggerOption = <T>(data: T) => ({
  status: HttpStatus.OK,
  description: 'Success',
  content: {
    'application/json': { example: data },
  },
});

export const DefaultCreatedRequestSwaggerOption = <T>(data: T) => ({
  status: HttpStatus.CREATED,
  description: 'Success',
  content: {
    'application/json': { example: data },
  },
});

export const DefaultUnprocessableRequestSwaggerOption = () => ({
  status: HttpStatus.UNPROCESSABLE_ENTITY,
  description: 'Success',
  content: {
    'application/json': {
      example: { message: 'File is required', extensions: null },
    },
  },
});

export const DefaultNotFoundRequestSwaggerOption = {
  status: HttpStatus.NOT_FOUND,
  description: 'Not found',
  content: {
    'application/json': {
      example: { message: 'Not found', extensions: null },
    },
  },
};
