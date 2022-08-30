import { Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export function LoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const logger = new Logger(LoggerMiddleware.name);
  logger.log(` Request to ${req.originalUrl}`);
  next();
}
