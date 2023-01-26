import { HttpEventType } from '@angular/common/http';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/models/user';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit, OnDestroy {
  isLoading = false;
  isAvatarUploading = false;
  uploadProgress = 0;
  user: User | undefined;
  @ViewChild('fileInput', { static: false }) fileInput:
    | ElementRef<HTMLInputElement>
    | undefined;
  fileToUpload: File | undefined;
  imageUrl: string | undefined;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.getUserInfo(params['id']);
      },
    });
  }
  getUserInfo(id: string) {
    this.isLoading = true;
    this.usersService.getUserData(id).subscribe({
      next: (data) => {
        this.user = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }
  handleFileInput() {
    const file = this.fileInput!.nativeElement.files![0];
    this.fileToUpload = file;
    let reader = new FileReader();
    reader.onload = (e) => {
      this.submitAvatar();
    };
    reader.readAsDataURL(file);
  }
  clearPicture() {
    this.fileToUpload = undefined;
    this.imageUrl = undefined;
    this.fileInput!.nativeElement.value = '';
  }
  submitData() {
    if (!this.user!.name?.trim()) return;
    this.isLoading = true;
    const userData = new FormData();
    userData.append('name', this.user!.name.trim());
    userData.append('bio', this.user!.bio?.trim() ?? '');
    userData.append('location', this.user!.location?.trim() ?? '');
    this.usersService.updateUserData(userData).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          const total: number = event.total ?? 1;
          this.uploadProgress = Math.round((event.loaded / total) * 100);
        }
        if (event.type === HttpEventType.Response) {
          this.user = event.body!;
          this.uploadProgress = 0;
        }
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
        this.uploadProgress = 0;
      },
      complete: () => {
        this.clearPicture();
        this.isLoading = false;
        this.uploadProgress = 0;
        this.router.navigate(['/users', 'profile', this.user?.id]);
      },
    });
  }
  submitAvatar() {
    this.isAvatarUploading = true;
    const userData = new FormData();
    userData.append('uploadAvatar', this.fileToUpload!);
    this.usersService.updateUserData(userData).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress) {
          const total: number = event.total ?? 1;
          this.uploadProgress = Math.round((event.loaded / total) * 100);
        }
        if (event.type === HttpEventType.Response) {
          this.user!.avatar = event.body?.avatar;
          this.authService.updateAvatar(event.body!);
        }
      },
      error: (err) => {
        console.log(err);
        this.isAvatarUploading = false;
        this.uploadProgress = 0;
      },
      complete: () => {
        this.clearPicture();
        this.isAvatarUploading = false;
        this.uploadProgress = 0;
      },
    });
  }
  ngOnDestroy(): void {}
}
