import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from './jwt.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user/create-user.dto'; // Import CreateUserDto
import { User } from '../user/user.schema'; // Import User schema

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  // Register method with CreateUserDto
  async register(body: CreateUserDto) {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const newUser: User = await this.userService.create({
      email: body.email,
      password: hashedPassword,
      name: body.name,
      role: body.role || 'customer',
    });

    const token = this.jwtService.generateToken(newUser);
    return { token };
  }

  // Login method with proper user typing
  async login(body: { email: string; password: string }) {
    // Validate user credentials
    const user: User | null = await this.userService.findByEmail(body.email);
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = this.jwtService.generateToken(user);
    return { token };
  }
}
