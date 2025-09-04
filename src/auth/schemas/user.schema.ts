// src/auth/schemas/user.schema.ts
import { Schema, Document } from 'mongoose';
import * as uuid from 'uuid';

export interface User extends Document {
  userId: string;
  username: string;
  password: string;
  name: string;
  email: string;
  roles: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Define the User schema
export const UserSchema = new Schema(
  {
    userId: { type: String, default: uuid.v4 }, // UUID for userId
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    roles: { type: [String], default: [] },
  },
  { timestamps: true }
);
