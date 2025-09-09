import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from '../schemas/customer.schema';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { LoginDto } from '../dto/login-dto';
import { AuthServiceProvider } from '../auth.service.provider';

@Injectable()
export class CustomerService {
  constructor(
    private readonly authServiceProvider: AuthServiceProvider<
      Customer,
      CreateCustomerDto
    >,
    @InjectModel(Customer.name) private customerModel: Model<Customer>
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.authServiceProvider.register(
      createCustomerDto,
      this.customerModel
    );
  }

  async login(loginDto: LoginDto): Promise<Customer> {
    return this.authServiceProvider.login(loginDto, this.customerModel);
  }

  async changePassword(
    entityId: string,
    oldPassword: string,
    newPassword: string
  ): Promise<any> {
    return this.authServiceProvider.changePassword(
      entityId,
      oldPassword,
      newPassword,
      this.customerModel
    );
  }
}
