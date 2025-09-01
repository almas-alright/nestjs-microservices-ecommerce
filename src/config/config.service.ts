import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ConfigService {
  constructor(serviceName: string) {
    // Set default to 'common' if no service name is passed
    const nodeEnv = process.env.NODE_ENV || 'development';

    // Load common .env file if exists (for shared configurations)
    dotenv.config({ path: path.resolve(__dirname, '../../.env') });

    // Dynamically load the service-specific .env file based on service name
    const envPath = path.resolve(
      __dirname,
      `../../${serviceName}.env.${nodeEnv}`
    );

    if (!fs.existsSync(envPath)) {
      console.warn(`Environment file ${envPath} not found.`);
    }
    dotenv.config({ path: envPath }); // Load the service-specific .env file
  }

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
