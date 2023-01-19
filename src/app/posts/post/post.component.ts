import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthDto } from 'src/app/auth/authdto';
import { Post } from 'src/app/models/post';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit, OnDestroy {
  post: Post | undefined;
  authData: AuthDto | undefined;
  private authSub = new Subscription();
  isLoading = false;
  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => this.getPost(params['id']),
    });
    this.authSub = this.authService.authData$.subscribe({
      next: (data) => (this.authData = data),
    });
  }
  getPost(id: string) {
    this.isLoading = true;
    this.postsService.getPost(id).subscribe({
      next: (post) => {
        this.post = post;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
