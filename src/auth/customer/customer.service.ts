import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerDto } from '../dto/create-customer.dto'; // DTO for customer registration
import { Customer } from '../schemas/customer.schema'; // Customer Schema
import { PasswordService } from '../password/password.service'; // Password hashing service

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer') private customerModel: Model<Customer>,
    private readonly passwordService: PasswordService // Inject PasswordService for hashing
  ) {}

  // Register customer
  async register(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const hashedPassword = await this.passwordService.hashPassword(
      createCustomerDto.password
    ); // Hash the password

    const customer = new this.customerModel({
      ...createCustomerDto, // No need to destructure the properties again
      password: hashedPassword, // Store the hashed password
    });

    return await customer.save(); // Save the customer in the DB
  }

  // Login customer
  async login(username: string, password: string): Promise<Customer> {
    const customer = await this.customerModel.findOne({ username }).exec(); // Find customer by username
    if (!customer) {
      throw new Error('Invalid credentials'); // If not found, throw error
    }

    const isPasswordValid = await this.passwordService.comparePassword(
      password,
      customer.password
    ); // Compare passwords
    if (!isPasswordValid) {
      throw new Error('Invalid credentials'); // If password is incorrect, throw error
    }

    return customer; // Return the customer if credentials are valid
  }
}
