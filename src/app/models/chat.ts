import { User } from './user';

export interface Chat {
  id: string;
  users: User[];
  messages: string[];
  lastMessage: string;
  lastMessageId: string;
}
