export interface CreateUserDto {
  email: string;
  password: string;
  name: string;
  role?: string; // Role is optional, defaulting to 'customer'
}
