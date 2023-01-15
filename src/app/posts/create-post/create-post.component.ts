import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent {
  @ViewChild('filesInput', { static: true }) filesInput:
    | ElementRef<HTMLInputElement>
    | undefined;
  filesToUpload: File[] = [];
  imageUrls: string[] = [];
  initialImage: string | undefined;

  constructor(private postsService: PostsService) {}
  handleFileInput() {
    let files = this.filesInput!.nativeElement.files;

    for (let i = 0; i != files!.length; ++i) {
      // Collect files
      const file = files!.item(i)!;
      this.filesToUpload.push(file);
      // Read files to preview
      let reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrls.push(e.target!.result as string);
        if (!this.initialImage) this.initialImage = this.imageUrls[0];
      };
      reader.readAsDataURL(file);
    }
  }
  clearPictures() {
    this.filesToUpload = [];
    this.imageUrls = [];
    this.initialImage = undefined;
    this.filesInput!.nativeElement.value = '';
  }
  submitPost(form: NgForm) {
    if (!form.value.postText && this.filesToUpload.length === 0) return;
    const data = form.value;
    const post = new FormData();
    post.append('text', data.postText.trim());
    this.filesToUpload.forEach((f) => post.append('uploadPhotos', f));
    this.postsService.createPost(post).subscribe({
      error: (err) => console.log(err),
      complete: () => {
        form.resetForm();
        this.clearPictures();
      },
    });
  }
}
