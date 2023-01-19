import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Comment } from 'src/app/models/comment';
import { PostsService } from '../../posts.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss'],
})
export class AddCommentComponent {
  @Input() postId: string | undefined;
  isLoading = false;
  constructor(private postsService: PostsService) {}

  submitComment(form: NgForm) {
    this.isLoading = true;
    const text = form.value.commentText?.trim();
    if (!text) return;
    const comment: Partial<Comment> = {
      postId: this.postId,
      text,
    };
    this.postsService.commentOnPost(comment).subscribe({
      next: () => {
        form.resetForm();
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
}
