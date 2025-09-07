import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from './user/user.service';
import { CustomerService } from './customer/customer.service';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { User } from './schemas/user.schema';
import { Customer } from './schemas/customer.schema';
import { UtilsService } from './utils/utils.service'; // Import UtilsService

interface JwtPayload {
  username: string;
  sub: string;
  provider: string;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private userService: UserService,
    private customerService: CustomerService,
    private utilsService: UtilsService // Inject UtilsService
  ) {}

  async loginUser(username: string, password: string) {
    let user: User;
    try {
      user = await this.userService.login(username, password);
      if (!user) {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      const duplicatedField = this.utilsService.getDuplicateField(error); // Use UtilsService
      if (duplicatedField) {
        throw new Error(`${duplicatedField} already exists.`);
      }
      throw error;
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

  async loginCustomer(username: string, password: string) {
    let customer: Customer;
    try {
      customer = await this.customerService.login(username, password);
      if (!customer) {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      const duplicatedField = this.utilsService.getDuplicateField(error); // Use UtilsService
      if (duplicatedField) {
        throw new Error(`${duplicatedField} already exists.`);
      }
      throw error;
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
    return this.loginUser(user.username, createUserDto.password);
  }

  async registerCustomer(createCustomerDto: CreateCustomerDto) {
    const customer: Customer =
      await this.customerService.register(createCustomerDto);
    return this.loginCustomer(customer.username, createCustomerDto.password);
  }
}
