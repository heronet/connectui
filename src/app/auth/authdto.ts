export interface LoginDto {
  email: string;
  password: string;
}
export interface RegisterDto {
  email: string;
  password: string;
}
export interface AuthDto {
  email: string;
  id: string;
  roles?: string[];
  token: string;
}
