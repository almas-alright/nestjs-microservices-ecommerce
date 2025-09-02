import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ConfigService {
  constructor(serviceName: string) {
    const nodeEnv = process.env.NODE_ENV || 'development'; // Default to 'development' if NODE_ENV is not set

    // Load the common .env file if needed (for shared configuration)
    dotenv.config({ path: path.resolve(__dirname, '../../.env') });

    // Construct the path to the service-specific .env file based on service name and NODE_ENV
    const envPath = path.resolve(
      __dirname,
      `../../.env.${serviceName}.${nodeEnv}`
    );

    // If the service-specific environment file doesn't exist, fall back to the general .env.${serviceName}
    if (!fs.existsSync(envPath)) {
      console.warn(
        `Environment file ${envPath} not found. Falling back to .env.${serviceName}`
      );
      dotenv.config({
        path: path.resolve(__dirname, `../../.env.${serviceName}`),
      }); // Load the default service-specific .env file
    } else {
      dotenv.config({ path: envPath }); // Load the environment file specific to NODE_ENV
    }
  }

  // Retrieve an environment variable or return a default value if not found
  get(key: string, defaultValue: string = ''): string {
    const value = process.env[key];
    if (value === undefined) {
      console.warn(
        `Environment variable ${key} is not set. Using default value: ${defaultValue}`
      );
      return defaultValue;
    }
    return value;
  }
}
