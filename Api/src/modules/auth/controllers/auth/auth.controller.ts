import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  InternalServerErrorException,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { LoginUser, ResponseLoginUser } from '../../dto/auth.dto';
import { UsersService } from 'src/modules/users/services/users/users.service';
import { Request as RequestE, Response } from 'express';
import { map, Observable } from 'rxjs';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';
import { CookieGuard } from '../../guards/cookie.guard';

interface Request extends RequestE {
  user?: any;
}

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private usersService: UsersService) {}
  // Route
  @ApiOperation({ summary: 'For admin login to client frontend' })
  @ApiExtraModels(LoginUser)
  @ApiBody({
    description: 'Please enter username & password',
    schema: {
      $ref: getSchemaPath(LoginUser),
    },
    examples: {
      0: {
        summary: 'Login Correct',
        description: 'Login Correct',
        value: { username: 'Pakpoom', password: 'testtttttt' },
      },
      1: {
        summary: 'Empty Login',
        description: 'Empty Login',
        value: {},
      },
    },
  })
  @ApiExtraModels(ResponseLoginUser)
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {
      $ref: getSchemaPath(ResponseLoginUser),
    },
  })
  @Post('login')
  @HttpCode(200)
  login(
    @Body() loginUser: LoginUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    try {
      return this.usersService.login(loginUser).pipe(
        map((data) => {
          response.cookie('token', data.accessToken, {
            httpOnly: true,
          });
          return {
            status: 200,
            data: data,
          };
        }),
      );
    } catch (error) {
      throw new InternalServerErrorException('loginCon ' + error.message);
    }
  }

  @Get('refreshToken')
  @HttpCode(200)
  refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ): Observable<any> | Promise<any> {
    try {
      const token = request.headers['authorization'].slice(7);
      return this.usersService.refreshToken(token).pipe(
        map((refreshToken) => {
          response.cookie('token', refreshToken, {
            httpOnly: true,
          });
          return {
            status: 200,
            refreshToken,
          };
        }),
      );
    } catch (error) {
      throw new InternalServerErrorException(
        'refreshTokenCon ' + error.message,
      );
    }
  }

  // @HasRoles(Role.ADMIN, Role.USER)
  @UseGuards(JwtAuthGuard, CookieGuard)
  @Get('test')
  @HttpCode(200)
  test(): Observable<any> | Promise<any> | any {
    try {
      return { message: 'test' };
    } catch (error) {
      throw new InternalServerErrorException('testCon ' + error.message);
    }
  }
}
