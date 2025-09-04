import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as uuid from 'uuid';

@Schema({ timestamps: true })
export class Customer extends Document {
  @Prop({ type: String, default: uuid.v4 }) // UUID for userId
  userId: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;

  // Add other necessary fields here
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
