import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../schemas/user.schema';
import { PasswordService } from '../password/password.service'; // Import PasswordService
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private readonly passwordService: PasswordService, // Inject PasswordService
    private utilsService: UtilsService
  ) {}

  // Create user method with password hashing
  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = new this.userModel(createUserDto);
      return await createdUser.save();
    } catch (error) {
      const duplicatedField = this.utilsService.getDuplicateField(error);

      if (duplicatedField) {
        const message = `${duplicatedField.charAt(0).toUpperCase() + duplicatedField.slice(1)} already exists.`;
        throw new ConflictException(message);
      }

      throw error; // Propagate other errors
    }
  }

  // Login user method to validate credentials
  async login(username: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ username }).exec(); // Find user by username
    if (!user) {
      throw new Error('Invalid credentials'); // If user not found, throw error
    }

    // Compare password with the stored hashed password
    const isPasswordValid = await this.passwordService.comparePassword(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error('Invalid credentials'); // If password is invalid, throw error
    }

    return user; // Return the user if login is successful
  }
}
