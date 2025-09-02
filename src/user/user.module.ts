import { Module } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserSchema } from './user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  providers: [
    { provide: ConfigService, useFactory: () => new ConfigService('user') },
    UserService,
  ],
  controllers: [UserController],
})
export class UserModule {}
