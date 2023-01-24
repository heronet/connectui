import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../models/comment';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private BASE_URL = `${environment.baseUrl}/posts`;
  private postSource = new Subject<Post>();
  post$ = this.postSource.asObservable();

  private deletedPostSource = new Subject<string>();
  deletedPost$ = this.deletedPostSource.asObservable();

  private newCommentSource = new Subject<Comment>();
  newComment$ = this.newCommentSource.asObservable();

  constructor(private http: HttpClient) {}

  getPosts(skip: number, take: number) {
    return this.http.get<Post[]>(`${this.BASE_URL}?skip=${skip}&take=${take}`);
  }
  getPost(id: string) {
    return this.http.get<Post>(`${this.BASE_URL}/${id}`);
  }
  createPost(post: FormData) {
    return this.http.post<Post>(`${this.BASE_URL}`, post).pipe(
      map((post) => {
        this.postSource.next(post);
      })
    );
  }
  updatePost(post: Partial<Post>) {
    return this.http.put<Post>(`${this.BASE_URL}/update`, post);
  }
  deletePost(postId: string) {
    return this.http
      .delete(`${this.BASE_URL}/delete/${postId}`)
      .pipe(map(() => this.deletedPostSource.next(postId)));
  }
  likePost(post: Partial<Post>) {
    return this.http.put<Post>(`${this.BASE_URL}/like`, post);
  }
  unLikePost(post: Partial<Post>) {
    return this.http.put<Post>(`${this.BASE_URL}/unlike`, post);
  }
  getComments(postId: string) {
    return this.http.get<Comment[]>(`${this.BASE_URL}/comments/${postId}`);
  }
  commentOnPost(comment: Partial<Comment>) {
    return this.http.post<Comment>(`${this.BASE_URL}/comments`, comment).pipe(
      map((comment) => {
        this.newCommentSource.next(comment);
        console.log(comment);
      })
    );
  }
}
