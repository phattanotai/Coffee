import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class CookieGuard implements CanActivate {
  canActivate(context: ExecutionContext): any | Promise<any> | Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { cookies }: { cookies: any } = request;
    try {
      const token = request.headers['authorization'].slice(7);
      // check cookies.token = request.headers['authorization']
      if (cookies.token === token) {
        return true;
      } else {
        throw false;
      }
    } catch (error) {
      if (!error.message) {
        throw new UnauthorizedException('Unauthorized Cookie');
      } else {
        throw new InternalServerErrorException('CookieGuard ' + error.message);
      }
    }
  }
}
