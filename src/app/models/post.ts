import { Photo } from './photo';

export interface Post {
  id: string;
  title: string;
  text: string;
  createdAt: string;
  userId: string;
  userName: string;
  userAvatarUrl?: string;
  likesCount: number;
  postLiked: boolean;
  commentsCount: number;
  photos: Photo[];
}
