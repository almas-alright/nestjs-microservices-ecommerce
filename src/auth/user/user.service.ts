import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { LoginDto } from '../dto/login-dto';
import { AuthServiceProvider } from '../auth.service.provider';

@Injectable()
export class UserService {
  constructor(
    private readonly authServiceProvider: AuthServiceProvider<
      User,
      CreateUserDto
    >,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.authServiceProvider.register(createUserDto, this.userModel);
  }

  async login(loginDto: LoginDto): Promise<User> {
    return this.authServiceProvider.login(loginDto, this.userModel);
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
      this.userModel
    );
  }
}
