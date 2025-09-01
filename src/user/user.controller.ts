import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service'; // Import the AuthService for login functionality

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService // Inject AuthService for handling login
  ) {}

  // Route to register a new user (admin/shop-owner/seller)
  @Post('register')
  async register(@Body() createUserDto: any) {
    return this.userService.create(createUserDto);
  }

  // Route to fetch user by email (used for login/lookup)
  @Get('find/:email')
  async findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  // Route for user login (returns JWT token)
  @Post('login')
  async login(@Body() body: any) {
    return this.authService.login(body); // Use AuthService for login
  }
}
