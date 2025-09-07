import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../schemas/user.schema';
import { PasswordService } from '../password/password.service';
import { UtilsService } from '../utils/utils.service'; // Import UtilsService

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

  async login(username: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await this.passwordService.comparePassword(
      password,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    return user;
  }
}
