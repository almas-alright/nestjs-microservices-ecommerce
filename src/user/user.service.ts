import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './create-user.dto'; // Import the CreateUserDto

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private userModel: Model<User>) {}

  // Using CreateUserDto for createUserDto parameter
  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }
}
