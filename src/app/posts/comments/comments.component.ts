import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Comment } from 'src/app/models/comment';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  @Input() postId: string | undefined;
  comments: Comment[] = [];
  commentSub = new Subscription();

  constructor(private postsService: PostsService) {}
  ngOnInit(): void {
    this.commentSub = this.postsService.newComment$.subscribe({
      next: (comment) => this.comments.push(comment),
    });
    this.getComments();
  }
  getComments() {
    this.postsService.getComments(this.postId!).subscribe({
      next: (comments) => {
        this.comments = comments;
      },
      error: (err) => console.log(err),
    });
  }
}
