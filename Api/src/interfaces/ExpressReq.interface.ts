import { Request as RequestE } from 'express';

export interface Request extends RequestE {
  user?: any;
}
