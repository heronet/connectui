export interface loginDto {
  email: string;
  password: string;
}
export interface authDto {
  email: string;
  id: string;
  roles: string[];
  token: string;
}
