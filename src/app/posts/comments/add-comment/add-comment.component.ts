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
  constructor(private postService: PostsService) {}

  submitComment(form: NgForm) {
    const text = form.value.commentText?.trim();
    if (!text) return;
    const comment: Partial<Comment> = {
      postId: this.postId,
      text,
    };
    this.postService.commentOnPost(comment).subscribe({
      next: () => form.resetForm(),
      error: (err) => console.log(err),
    });
  }
}
