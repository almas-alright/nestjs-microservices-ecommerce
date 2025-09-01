import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CustoomerService } from './custoomer/custoomer.service';
import { CustomerModule } from './customer/customer.module';
import { UserModule } from './user/user.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, UserModule, CustomerModule],
  controllers: [AppController],
  providers: [AppService, CustoomerService],
})
export class AppModule {}
