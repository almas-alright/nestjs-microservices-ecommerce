import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { Model, Document } from 'mongoose';
import { PasswordService } from './password/password.service';
import { UtilsService } from './utils/utils.service';
import { LoginDto } from './dto/login-dto';

interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
}

@Injectable()
export class AuthServiceProvider<ModelType extends UserDocument, DtoType> {
  constructor(
    private passwordService: PasswordService,
    private utilsService: UtilsService
  ) {}

  async register(
    createDto: DtoType,
    model: Model<ModelType>
  ): Promise<ModelType> {
    const existingEntity = await model
      .findOne({ username: createDto['username'] })
      .exec();
    if (existingEntity) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await this.passwordService.hashPassword(
      createDto['password']
    );
    const newEntity = new model({ ...createDto, password: hashedPassword });
    return await newEntity.save();
  }

  async login(loginDto: LoginDto, model: Model<ModelType>): Promise<ModelType> {
    let entity: ModelType | null;

    if (loginDto.email) {
      if (!this.utilsService.isValidEmail(loginDto.email)) {
        throw new BadRequestException('Invalid email format');
      }
      entity = await model.findOne({ email: loginDto.email }).exec();
    } else if (loginDto.username) {
      if (!this.utilsService.isValidUsername(loginDto.username)) {
        throw new BadRequestException('Invalid username format');
      }
      entity = await model.findOne({ username: loginDto.username }).exec();
    } else {
      throw new BadRequestException(
        'Either email or username must be provided'
      );
    }

    if (!entity) {
      throw new ConflictException('Invalid credentials');
    }

    const isPasswordValid = await this.passwordService.comparePassword(
      loginDto.password,
      entity.password
    );
    if (!isPasswordValid) {
      throw new ConflictException('Invalid credentials');
    }

    return entity;
  }

  async changePassword(
    entityId: string,
    oldPassword: string,
    newPassword: string,
    model: Model<ModelType>
  ): Promise<any> {
    const entity = await model.findById(entityId).exec();
    if (!entity) {
      throw new BadRequestException('Entity not found');
    }

    const isOldPasswordValid = await this.passwordService.comparePassword(
      oldPassword,
      entity.password
    );
    if (!isOldPasswordValid) {
      throw new BadRequestException('Incorrect old password');
    }

    entity.password = await this.passwordService.hashPassword(newPassword);
    await entity.save();

    return { message: 'Password changed successfully' };
  }
}
