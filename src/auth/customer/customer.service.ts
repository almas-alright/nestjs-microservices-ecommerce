import {
  Injectable,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { Customer } from '../schemas/customer.schema';
import { PasswordService } from '../password/password.service';
import { UtilsService } from '../utils/utils.service'; // Import UtilsService
import { LoginDto } from '../dto/login-dto'; // Import LoginDto

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer') private customerModel: Model<Customer>,
    private readonly passwordService: PasswordService,
    private utilsService: UtilsService // Inject UtilsService
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    try {
      const hashedPassword = await this.passwordService.hashPassword(
        createCustomerDto.password
      );

      const customer = new this.customerModel({
        ...createCustomerDto,
        password: hashedPassword,
      });

      return await customer.save();
    } catch (error) {
      const duplicatedField = this.utilsService.getDuplicateField(error); // Use UtilsService
      if (duplicatedField) {
        throw new ConflictException(
          `${duplicatedField.charAt(0).toUpperCase() + duplicatedField.slice(1)} already exists.`
        );
      }
      throw error; // Propagate other errors
    }
  }

  // Updated login method
  async login(loginDto: LoginDto): Promise<Customer> {
    let customer: Customer | null;

    // Check if the loginDto contains email or username
    if (loginDto.email) {
      // Validate email format using UtilsService
      if (!this.utilsService.isValidEmail(loginDto.email)) {
        throw new BadRequestException('Invalid email format');
      }

      // Search by email
      customer = await this.customerModel
        .findOne({ email: loginDto.email })
        .exec();
    } else if (loginDto.username) {
      // Validate username format using UtilsService
      if (!this.utilsService.isValidUsername(loginDto.username)) {
        throw new BadRequestException('Invalid username format');
      }

      // Search by username
      customer = await this.customerModel
        .findOne({ username: loginDto.username })
        .exec();
    } else {
      throw new BadRequestException(
        'Either email or username must be provided'
      );
    }

    // Handle case where no customer was found
    if (!customer) {
      throw new ConflictException('Invalid credentials');
    }

    const isPasswordValid = await this.passwordService.comparePassword(
      loginDto.password,
      customer.password
    );
    if (!isPasswordValid) {
      throw new ConflictException('Invalid credentials');
    }

    return customer;
  }
}
