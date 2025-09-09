import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      has: (key: string) => boolean;
    }
  }
}
