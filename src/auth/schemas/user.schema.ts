// src/auth/schemas/user.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as uuid from 'uuid';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ type: String, default: uuid.v4 }) // UUID for userId
  userId: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ type: [String], default: [] })
  roles: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
