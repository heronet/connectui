import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
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

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<Post[]>(`${this.BASE_URL}`);
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
    return this.http.delete(`${this.BASE_URL}/delete/${postId}`).subscribe({
      next: () => this.deletedPostSource.next(postId),
      error: (err) => console.log(err),
    });
  }
  likePost(post: Partial<Post>) {
    return this.http.put<Post>(`${this.BASE_URL}/like`, post);
  }
  unLikePost(post: Partial<Post>) {
    return this.http.put<Post>(`${this.BASE_URL}/unlike`, post);
  }
}
