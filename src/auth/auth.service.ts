// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user/user.service';

interface JwtPayload {
  username: string;
  sub: string;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService // Inject UserService
  ) {
    const dbUri = this.configService.get<string>('DB_URI');
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    const port = this.configService.get<number>('PORT');
    console.log(`DB URI: ${dbUri}, JWT Secret: ${jwtSecret}, Port: ${port}`);
  }

  // Login method (removed async since no await)
  login(user: CreateUserDto) {
    const payload: JwtPayload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Register method (added error handling)
  // src/auth/auth.service.ts
  async register(createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto); // Create user in DB
      return this.login(user); // Return JWT on registration
    } catch (error: unknown) {
      // Safely handle the error
      if (error instanceof Error) {
        console.error(error.message);
        throw new Error('User registration failed');
      }
      throw error; // Re-throw the error if it's not an instance of Error
    }
  }
}
