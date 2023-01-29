import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AuthDto } from '../auth/authdto';
import { Post } from '../models/post';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit, OnDestroy {
  isLoading = false;
  authData: AuthDto | undefined;
  posts: Post[] = [];
  postsSub = new Subscription();
  deletedPostSub = new Subscription();
  authSub = new Subscription();
  postsSkip = 0;
  postsTake = 20;
  canLoadMore: boolean | undefined;
  constructor(
    private postsService: PostsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
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
      next: (data) => (this.authData = data),
      error: (err) => console.log(err),
    });
    if (this.isFeed()) {
      this.getPosts();
    } else {
      this.route.params.subscribe({
        next: (params) => {
          this.getPosts(params['id']);
        },
      });
    }
  }
  isFeed() {
    return this.router.url.includes('/feed');
  }
  getPosts(userId: string | null = null) {
    this.isLoading = true;
    this.postsService
      .getPosts(this.postsSkip, this.postsTake, userId)
      .subscribe({
        next: (posts) => {
          this.posts.push(...posts);
          this.postsSkip += this.postsTake;
          if (posts.length < this.postsTake) this.canLoadMore = false;
          else this.canLoadMore = true;
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
