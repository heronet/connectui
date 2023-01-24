import { Photo } from './photo';

export interface User {
  email: string;
  id: string;
  name: string;
  bio?: string;
  location?: string;
  createdAt: string;
  lastOnline: string;
  avatar?: Photo;
}
