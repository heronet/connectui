import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Post } from '../models/post';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  userId: string | undefined;
  posts: Post[] = [];
  postsSub = new Subscription();
  authSub = new Subscription();

  constructor(
    private postsService: PostsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.postsSub = this.postsService.post$.subscribe({
      next: (post) => {
        this.posts.unshift(post);
        console.log(post);
      },
      error: (err) => console.log(err),
    });
    this.getPosts();
    this.authSub = this.authService.authData$.subscribe({
      next: (data) => (this.userId = data?.id ?? undefined),
      error: (err) => console.log(err),
    });
  }
  getPosts() {
    this.postsService.getPosts().subscribe({
      next: (posts) => (this.posts = posts),
      error: (err) => console.log(err),
    });
  }
  deletePost(id: string) {
    this.postsService.deletePost(id).subscribe({
      next: () => {
        this.posts = this.posts.filter((p) => p.id !== id);
      },
      error: (err) => console.log(err),
    });
  }
  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
    this.authSub.unsubscribe();
  }
}
