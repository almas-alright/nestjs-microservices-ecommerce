import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../schemas/user.schema';
import { PasswordService } from '../password/password.service'; // Import PasswordService

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private readonly passwordService: PasswordService // Inject PasswordService
  ) {}

  // Create user method with password hashing
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Hash the password before saving it
    const hashedPassword = await this.passwordService.hashPassword(
      createUserDto.password
    );

    // Create a new user with the hashed password
    const createdUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword, // Use the hashed password
    });

    return createdUser.save();
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
