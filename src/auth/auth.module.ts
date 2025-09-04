// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule } from '../config/config.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from './user/user.service';
import { UserSchema } from './schemas/user.schema'; // Import UserSchema directly
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    AppConfigModule.forRoot('auth'), // Pass 'auth' as serviceName here
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URI'), // Get the DB_URI from .env
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), // Use 'User' as string
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Pass JWT_SECRET dynamically
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }), // JWT configuration
    ConfigModule,
  ],
  providers: [AuthService, UserService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
