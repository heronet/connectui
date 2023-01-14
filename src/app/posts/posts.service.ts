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

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<Post[]>(`${this.BASE_URL}`);
  }
  createPost(post: FormData) {
    return this.http.post<Post>(`${this.BASE_URL}`, post).pipe(
      map((post) => {
        this.postSource.next(post);
      })
    );
  }
  deletePost(postId: string) {
    return this.http.delete(`${this.BASE_URL}/delete/${postId}`);
  }
}
