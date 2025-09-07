import { Injectable } from '@nestjs/common';
import { MongoServerError } from 'mongodb';

@Injectable()
export class UtilsService {
  isMongoServerError(error: unknown): error is MongoServerError {
    return (
      error instanceof Error &&
      'code' in error &&
      (error as MongoServerError).code === 11000
    );
  }

  // Safely get the duplicate field
  // Safely get the duplicate field
  getDuplicateField(error: unknown): string | null {
    if (this.isMongoServerError(error)) {
      // Now that we know `error` is MongoServerError, `keyValue` is safe to access
      const { keyValue } = error; // Deconstructing to access keyValue safely

      // Ensure keyValue is an object before using it
      if (keyValue && typeof keyValue === 'object') {
        const duplicatedField = Object.keys(keyValue)[0];
        return duplicatedField || null;
      }
    }
    return null;
  }
}
