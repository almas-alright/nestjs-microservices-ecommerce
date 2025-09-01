import { Schema, Document, Types } from 'mongoose';

export const UserSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'shop-owner', 'customer'],
      default: 'customer',
    }, // Roles: admin, shop-owner, customer
  },
  {
    timestamps: true,
  }
);

export interface User extends Document {
  _id: string;
  email: string;
  password: string;
  name: string;
  role: string;
}
