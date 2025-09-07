import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../schemas/user.schema';
import { PasswordService } from '../password/password.service';
import { UtilsService } from '../utils/utils.service'; // Import UtilsService
import { LoginDto } from '../dto/login-dto'; // Import LoginDto

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    private readonly passwordService: PasswordService,
    private utilsService: UtilsService // Inject UtilsService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = new this.userModel(createUserDto);
      return await createdUser.save();
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
  async login(loginDto: LoginDto): Promise<User> {
    let user: User | null;

    // Check if the loginDto contains email or username
    if (loginDto.email) {
      // Validate email format using UtilsService
      if (!this.utilsService.isValidEmail(loginDto.email)) {
        throw new BadRequestException('Invalid email format');
      }

      // Search by email
      user = await this.userModel.findOne({ email: loginDto.email }).exec();
    } else if (loginDto.username) {
      // Validate username format using UtilsService
      if (!this.utilsService.isValidUsername(loginDto.username)) {
        throw new BadRequestException('Invalid username format');
      }

      // Search by username
      user = await this.userModel
        .findOne({ username: loginDto.username })
        .exec();
    } else {
      throw new BadRequestException(
        'Either email or username must be provided'
      );
    }

    // Handle case where no user was found
    if (!user) {
      throw new ConflictException('Invalid credentials');
    }

    const isPasswordValid = await this.passwordService.comparePassword(
      loginDto.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new ConflictException('Invalid credentials');
    }

    return user;
  }
}
