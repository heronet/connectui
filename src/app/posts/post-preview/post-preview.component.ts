import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthDto } from 'src/app/auth/authdto';
import { Post } from 'src/app/models/post';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.scss'],
})
export class PostPreviewComponent {
  constructor(private postsService: PostsService, private router: Router) {}
  @Input() post: Post | undefined;
  @Input() authData: AuthDto | undefined;
  @Input() enableLinks: boolean | undefined;
  @Input() photosLinear: boolean | undefined;

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
  like(post: Post) {
    this.post!.postLiked = true;
    this.post!.likesCount += 1;
    this.postsService.likePost(post).subscribe({
      next: (post) => {},
      error: (err) => {
        console.log(err);
        this.post!.likesCount -= 1;
      },
    });
  }
  unlike(post: Post) {
    this.post!.postLiked = false;
    this.post!.likesCount -= 1;
    this.postsService.unLikePost(post).subscribe({
      next: (post) => {},
      error: (err) => {
        console.log(err);
        this.post!.likesCount += 1;
      },
    });
  }
  navigate() {
    if (this.enableLinks) this.router.navigate(['/posts', this.post?.id]);
  }
}
