import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user/user.service';
import { CustomerService } from './customer/customer.service';
import { CreateUserDto } from './dto/create-user.dto'; // Import CreateUserDto
import { CreateCustomerDto } from './dto/create-customer.dto'; // Import CreateCustomerDto
import { User } from './schemas/user.schema';
import { Customer } from './schemas/customer.schema';

interface JwtPayload {
  username: string;
  sub: string;
  provider: string; // To distinguish between user and customer
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService, // Inject UserService
    private customerService: CustomerService // Inject CustomerService
  ) {
    const dbUri = this.configService.get<string>('DB_URI');
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    const port = this.configService.get<number>('PORT');
    console.log(`DB URI: ${dbUri}, JWT Secret: ${jwtSecret}, Port: ${port}`);
  }

  // Login method for User (Marketplace)
  async loginUser(username: string, password: string) {
    let user: User;

    try {
      user = await this.userService.login(username, password); // User login
      if (!user) {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error logging in the user: ${error.message}`);
      }
      throw error; // Propagate non-error issues
    }

    // Ensure user object is typed correctly
    const payload: JwtPayload = {
      username: user.username,
      sub: user.userId,
      provider: 'user',
    };
    return {
      access_token: this.jwtService.sign(payload), // Return JWT token
    };
  }

  // Login method for Customer
  async loginCustomer(username: string, password: string) {
    let customer: Customer;

    try {
      customer = await this.customerService.login(username, password); // Customer login
      if (!customer) {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error logging in the customer: ${error.message}`);
      }
      throw error; // Propagate non-error issues
    }

    // Use customer.userId for the JWT payload
    const payload: JwtPayload = {
      username: customer.username,
      sub: customer.userId,
      provider: 'customer',
    };
    return {
      access_token: this.jwtService.sign(payload), // Return JWT token
    };
  }

  // Register method for User (Marketplace)
  async registerUser(createUserDto: CreateUserDto) {
    const user: User = await this.userService.create(createUserDto); // Register user
    return this.loginUser(user.username, createUserDto.password); // Login after registration
  }

  // Register method for Customer
  async registerCustomer(createCustomerDto: CreateCustomerDto) {
    const customer: Customer =
      await this.customerService.register(createCustomerDto); // Register customer
    return this.loginCustomer(customer.username, createCustomerDto.password); // Login after registration
  }
}
