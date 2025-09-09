import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule } from '../config/config.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from './user/user.service';
import { User, UserSchema } from './schemas/user.schema'; // Import UserSchema directly
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PasswordService } from './password/password.service';
import { CustomerService } from './customer/customer.service';
import { Customer, CustomerSchema } from './schemas/customer.schema';
import { UtilsService } from './utils/utils.service';
import { AuthServiceProvider } from './auth.service.provider'; // Ensure Customer schema is imported

@Module({
  imports: [
    AppConfigModule.forRoot('auth'), // Pass 'auth' as serviceName here
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URI'), // Get the DB_URI from .env
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Customer.name, schema: CustomerSchema }, // Register Customer schema
    ]), // Register Customer model here
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Pass JWT_SECRET dynamically
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }), // JWT configuration
    ConfigModule,
  ],
  providers: [
    JwtStrategy,
    PasswordService,
    UtilsService,
    AuthService,
    AuthServiceProvider,
    UserService,
    CustomerService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
