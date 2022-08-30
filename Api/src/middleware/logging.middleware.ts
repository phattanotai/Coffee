import {
  ExecutionContext,
  Injectable,
  Logger,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggingMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method } = req;
    this.logger.log(
      `Request from ${ip} method ${method} to ${req.originalUrl}`,
    );
    next();
  }
}
