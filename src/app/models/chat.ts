import { Message } from './message';
import { User } from './user';

export interface Chat {
  id: string;
  users: User[];
  messages: Message[];
  lastMessage: string;
  lastMessageId: string;
}
