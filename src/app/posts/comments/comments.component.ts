import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthDto } from 'src/app/auth/authdto';
import { Comment } from 'src/app/models/comment';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit, OnDestroy {
  @Input() postId: string | undefined;
  isLoading = false;
  processingComment = false;
  comments: Comment[] = [];
  authData: AuthDto | undefined;
  commentSub = new Subscription();
  authSub = new Subscription();
  constructor(
    private postsService: PostsService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.authSub = this.authService.authData$.subscribe({
      next: (data) => (this.authData = data),
    });
    this.commentSub = this.postsService.newComment$.subscribe({
      next: (comment) => this.comments.unshift(comment),
    });
    this.getComments();
  }
  getComments() {
    this.isLoading = true;
    this.postsService.getComments(this.postId!).subscribe({
      next: (comments) => {
        this.comments = comments;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
  deleteComment(id: string) {
    this.processingComment = true;
    this.postsService.deleteComment(id).subscribe({
      next: () => {
        this.comments = this.comments.filter((c) => c.id !== id);
        this.processingComment = false;
      },
      error: (err) => {
        console.log(err);
        this.processingComment = false;
      },
    });
  }
  ngOnDestroy(): void {
    this.authSub.unsubscribe();
    this.commentSub.unsubscribe();
  }
}
