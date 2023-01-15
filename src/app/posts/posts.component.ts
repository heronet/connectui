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
  isLoading = false;
  userId: string | undefined;
  posts: Post[] = [];
  postsSub = new Subscription();
  deletedPostSub = new Subscription();
  authSub = new Subscription();

  constructor(
    private postsService: PostsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.postsSub = this.postsService.post$.subscribe({
      next: (post) => this.posts.unshift(post),
      error: (err) => console.log(err),
    });
    this.deletedPostSub = this.postsService.deletedPost$.subscribe({
      next: (id) => {
        this.posts = this.posts.filter((p) => p.id !== id);
      },
    });
    this.authSub = this.authService.authData$.subscribe({
      next: (data) => (this.userId = data?.id ?? undefined),
      error: (err) => console.log(err),
    });
    this.getPosts();
  }
  getPosts() {
    this.isLoading = true;
    this.postsService.getPosts().subscribe({
      next: (posts) => {
        this.posts = posts;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      },
    });
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
    this.authSub.unsubscribe();
    this.deletedPostSub.unsubscribe();
  }
}
