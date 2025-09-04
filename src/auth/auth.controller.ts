import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // User Registration
  @Post('marketplace/register')
  async registerUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.registerUser(createUserDto);
  }

  // User Login
  @Post('marketplace/login')
  async loginUser(@Body() loginDto: { username: string; password: string }) {
    return this.authService.loginUser(loginDto.username, loginDto.password);
  }

  // Customer Registration
  @Post('customer/register')
  async registerCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.authService.registerCustomer(createCustomerDto);
  }

  // Customer Login
  @Post('customer/login')
  async loginCustomer(
    @Body() loginDto: { username: string; password: string }
  ) {
    return this.authService.loginCustomer(loginDto.username, loginDto.password);
  }
}
