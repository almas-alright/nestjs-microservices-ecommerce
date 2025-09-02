import { Module } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

@Module({
  imports: [],
  controllers: [CustomerController],
  providers: [
    { provide: ConfigService, useFactory: () => new ConfigService('customer') },
    CustomerService,
  ],
})
export class CustomerModule {}
