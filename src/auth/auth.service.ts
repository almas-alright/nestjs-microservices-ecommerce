import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user/user.service';
import { CustomerService } from './customer/customer.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { LoginDto } from './dto/login-dto';
import { User } from './schemas/user.schema';
import { Customer } from './schemas/customer.schema';

interface JwtPayload {
  username: string;
  sub: string;
  provider: string;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private customerService: CustomerService
  ) {}

  async loginUser(loginDto: LoginDto) {
    let user: User;
    try {
      user = await this.userService.login(loginDto); // Pass the full loginDto
      if (!user) {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error logging in the user: ${error.message}`);
      }
      throw error; // Propagate other types of errors safely
    }

    const payload: JwtPayload = {
      username: user.username,
      sub: user.userId,
      provider: 'user',
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async loginCustomer(loginDto: LoginDto) {
    let customer: Customer;
    try {
      customer = await this.customerService.login(loginDto); // Pass the full loginDto
      if (!customer) {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error logging in the customer: ${error.message}`);
      }
      throw error; // Propagate other types of errors safely
    }

    const payload: JwtPayload = {
      username: customer.username,
      sub: customer.userId,
      provider: 'customer',
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async registerUser(createUserDto: CreateUserDto) {
    const user: User = await this.userService.create(createUserDto);
    return this.loginUser({
      username: user.username,
      password: createUserDto.password,
    });
  }

  async registerCustomer(createCustomerDto: CreateCustomerDto) {
    const customer: Customer =
      await this.customerService.create(createCustomerDto);
    return this.loginCustomer({
      username: customer.username,
      password: createCustomerDto.password,
    });
  }
}
