import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { Observable } from 'rxjs';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get('userProfile')
  getUserData(@Req() request: any): Observable<any> | Promise<any> | any {
    return {
      statusCode: 200,
      message: 'Ok',
      data: request.user,
    };
  }

  @Get('userProfile')
  getHello(): string {
    return 'Hello World!';
  }
}
