import { Module, Global } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import * as path from 'path';

@Global() // Makes it globally available in the app
@Module({})
export class AppConfigModule {
  static forRoot(serviceName: string) {
    const envFilePath = path.resolve(
      process.cwd(),
      `.env.${serviceName}.${process.env.NODE_ENV || 'development'}` // Dynamically load the environment file
    );

    // Log the environment file path to confirm it's being loaded correctly
    console.log(`Loaded environment file: ${envFilePath}`);

    return NestConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
    });
  }
}
