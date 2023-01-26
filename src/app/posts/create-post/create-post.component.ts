import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit, OnDestroy {
  @Input() avatarUrl: string | undefined;
  isLoading = false;
  uploadProgress = 0;
  uploadProgressSub = new Subscription();
  @ViewChild('filesInput', { static: true }) filesInput:
    | ElementRef<HTMLInputElement>
    | undefined;
  filesToUpload: File[] = [];
  imageUrls: string[] = [];
  initialImage: string | undefined;

  constructor(private postsService: PostsService) {}
  ngOnInit(): void {
    this.postsService.uploadProgress$.subscribe({
      next: (progress) => (this.uploadProgress = progress),
    });
  }
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
    this.isLoading = true;
    const data = form.value;
    const post = new FormData();
    post.append('text', data.postText?.trim() ?? '');
    this.filesToUpload.forEach((f) => post.append('uploadPhotos', f));
    this.postsService.createPost(post).subscribe({
      error: (err) => {
        console.log(err);
        this.isLoading = false;
        this.uploadProgress = 0;
      },
      complete: () => {
        form.resetForm();
        this.clearPictures();
        this.isLoading = false;
        this.uploadProgress = 0;
      },
    });
  }
  ngOnDestroy(): void {
    this.uploadProgressSub.unsubscribe();
  }
}
