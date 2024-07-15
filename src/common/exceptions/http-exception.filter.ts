import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ExceptionResponseType } from '../../types/common-error.types';
import { DomainException } from './custom-errors/domain.exception';
import { ExceptionCodes } from './exception-codes';
import { NotificationExtension } from '../resultNotification';
@Catch(DomainException)
export class DomainExceptionsFilter implements ExceptionFilter {
  catch(exception: DomainException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    console.log(exception);
    try {
      const calculateHttpCode = (exception: DomainException) => {
        switch (exception.code) {
          case ExceptionCodes.BadRequest: {
            return HttpStatus.BAD_REQUEST;
          }
          case ExceptionCodes.Forbidden: {
            return HttpStatus.FORBIDDEN;
          }
          case ExceptionCodes.NotFound: {
            return HttpStatus.NOT_FOUND;
          }
          case ExceptionCodes.Unauthorized: {
            return HttpStatus.UNAUTHORIZED;
          }
          default: {
            return HttpStatus.I_AM_A_TEAPOT;
          }
        }
      };
      response.status(calculateHttpCode(exception)).json({
        ...getDefaultResponseHttpBody(exception.extensions),
        message: exception.message,
      });
    } catch (error) {
      console.log('Domain EXCEPTION CATCH:', error);
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(getDefaultResponseHttpBody());
    }
  }
}
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private isNonProduction: boolean) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    try {
      const isHttpException = exception instanceof HttpException;
      const exceptionResponse = isHttpException
        ? (exception.getResponse() as ExceptionResponseType)
        : null;
      const message = isHttpException ? exception?.message : 'Some error';
      const errorDescription = Array.isArray(exceptionResponse?.message)
        ? exceptionResponse?.message
        : null;

      const status = isHttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

      if (this.isNonProduction || status !== HttpStatus.INTERNAL_SERVER_ERROR) {
        response.status(status).json({
          ...getDefaultResponseHttpBody(),
          message,
          extensions: errorDescription,
        });

        return;
      }
      response.status(status).json(getDefaultResponseHttpBody());
    } catch (error) {
      console.log('All EXCEPTIONS CATCH:', error);
      response
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json(getDefaultResponseHttpBody());
    }
  }
}

const getDefaultResponseHttpBody = (
  extensions: NotificationExtension[] = [],
) => ({
  message: 'Some error occurred',
  extensions,
});
