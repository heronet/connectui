import { Component, Input } from '@angular/core';
import { Post } from 'src/app/models/post';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.scss'],
})
export class PostPreviewComponent {
  constructor(private postsService: PostsService) {}
  @Input() post: Post | undefined;
  @Input() userId: string | undefined;
  postText: string | undefined;
  isEditMode = false;
  isLoading = false;

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
    if (!this.postText) {
      this.postText = this.post?.text;
    }
  }
  deletePost(id: string) {
    this.isLoading = true;
    this.postsService.deletePost(id);
  }
  savePost() {
    this.isLoading = true;
    let editedPost: Partial<Post> = {
      id: this.post?.id,
      text: this.postText,
    };
    this.postsService.updatePost(editedPost).subscribe({
      next: (post) => {
        this.post = post;
        this.isLoading = false;
        this.isEditMode = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
}