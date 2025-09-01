import { Injectable } from '@nestjs/common';
import { JwtService as Jwt } from '@nestjs/jwt';

// Define the User interface with expected properties
interface User {
  email: string;
  _id: string;
  role: string;
}

// Define the DecodedToken interface for the decoded JWT token structure
interface JwtPayload {
  username: string;
  sub: string;
  role: string;
}

@Injectable()
export class JwtService {
  constructor(private readonly jwt: Jwt) {}

  // Explicitly typing the return value of generateToken as a string
  generateToken(user: User): string {
    const payload = { username: user.email, sub: user._id, role: user.role }; // Payload
    return this.jwt.sign(payload); // The returned token is a string
  }

  // Typing the return value of verifyToken as DecodedToken
  verifyToken(token: string): JwtPayload {
    return this.jwt.verify(token); // The decoded token is typed as JwtPayload
  }
}
