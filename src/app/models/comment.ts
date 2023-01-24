export interface Comment {
  id: string;
  text: string;
  time: string;
  userId: string;
  userName: string;
  userAvatarUrl?: string;
  postId: string;
}
