import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
  providers: [ConfigService],
  exports: [ConfigService], // Export ConfigService so it can be injected into other modules
})
export class ConfigModule {}
