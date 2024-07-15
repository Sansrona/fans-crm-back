import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import {
  LoginUserViewExample,
} from './swagger.examples';
import {
  SwaggerUnauthorizedErrorCreator,
  DefaultUnauthorizedRequestSwaggerOption,
  DefaultOkRequestSwaggerOption,
  DefaultNoContentResponseSwaggerOption,
} from '../../../common/constants/swagger-responses';
import { AuthLoginDto } from '../api/dto/auth-login.dto';



export function SwaggerDecoratorForLoginUser(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'login user ' }),
    ApiBody({ type: AuthLoginDto }),
    ApiResponse(DefaultOkRequestSwaggerOption(LoginUserViewExample)),
    ApiResponse(
      DefaultUnauthorizedRequestSwaggerOption(
        SwaggerUnauthorizedErrorCreator('register error', [
          {
            message: 'wrong password',
            key: 'password',
          },
        ]),
      ),
    ),
  );
}

export function SwaggerDecoratorForMe(): MethodDecorator {
  return applyDecorators(
    ApiOperation({ summary: 'get me' }),
    ApiResponse(
      DefaultOkRequestSwaggerOption({
        id: 1,
        email: 'example@gmail.com',
      }),
    ),
    ApiResponse(
      DefaultUnauthorizedRequestSwaggerOption(
        SwaggerUnauthorizedErrorCreator('wrong access'),
      ),
    ),
  );
}



