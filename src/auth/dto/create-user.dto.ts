export class CreateUserDto {
  userId: string;
  username: string;
  password: string;
  name: string;
  email: string;
  roles?: string[]; // Optional, default is empty array
}
