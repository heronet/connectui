import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent {
  constructor(private postsService: PostsService) {}

  submitPost(form: NgForm) {
    if (!form.value.postText) return;
    const post: Partial<Post> = {
      text: form.value.postText,
    };
    this.postsService.createPost(post).subscribe({
      error: (err) => console.log(err),
      complete: () => form.resetForm(),
    });
  }
}
