import { Module } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtService } from './jwt.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'), // Fetch JWT secret from auth.env
        // signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  providers: [
    { provide: ConfigService, useFactory: () => new ConfigService('auth') },
    AuthService,
    JwtService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
