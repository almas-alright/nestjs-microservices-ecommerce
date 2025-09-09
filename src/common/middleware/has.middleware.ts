import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HasMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Add a `has()` method to the request object with type safety
    req.has = (key: string): boolean => {
      // Return the result as a boolean
      return (
        !!Object.hasOwnProperty.call(req.body, key) ||
        !!Object.hasOwnProperty.call(req.query, key) ||
        !!Object.hasOwnProperty.call(req.params, key)
      );
    };
    next();
  }
}
