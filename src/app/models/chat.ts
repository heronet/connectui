import { Message } from './message';
import { User } from './user';

export interface Chat {
  id: string;
  title: string;
  users: User[];
  messages: Message[];
  lastMessage: string;
  LastMessageSender: string;
}
