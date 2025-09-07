import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
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
  async loginUser(
    @Body() loginDto: { username?: string; email?: string; password: string }
  ) {
    if (!loginDto.username && !loginDto.email) {
      throw new BadRequestException(
        'Either email or username must be provided'
      );
    }

    if (loginDto.email) {
      return this.authService.loginUser({
        email: loginDto.email,
        password: loginDto.password,
      });
    } else {
      return this.authService.loginUser({
        username: loginDto.username,
        password: loginDto.password,
      });
    }
  }

  // Customer Registration
  @Post('customer/register')
  async registerCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.authService.registerCustomer(createCustomerDto);
  }

  // Customer Login
  @Post('customer/login')
  async loginCustomer(
    @Body() loginDto: { username?: string; email?: string; password: string }
  ) {
    if (!loginDto.username && !loginDto.email) {
      throw new BadRequestException(
        'Either email or username must be provided'
      );
    }

    if (loginDto.email) {
      return this.authService.loginCustomer({
        email: loginDto.email,
        password: loginDto.password,
      });
    } else {
      return this.authService.loginCustomer({
        username: loginDto.username,
        password: loginDto.password,
      });
    }
  }
}
