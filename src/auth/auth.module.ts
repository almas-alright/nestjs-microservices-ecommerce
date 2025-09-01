import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtService } from './jwt.service';

@Module({
  imports: [UserModule, JwtModule.register({ secret: 'your-secret-key' })],
  providers: [AuthService, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
