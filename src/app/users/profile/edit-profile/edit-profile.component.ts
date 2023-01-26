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
  user: User | undefined;
  @ViewChild('fileInput', { static: true }) fileInput:
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
    this.isLoading = true;
    const userData = new FormData();
    if (this.user!.name?.trim())
      userData.append('name', this.user!.name.trim());
    userData.append('bio', this.user!.bio?.trim() ?? '');
    userData.append('location', this.user!.location?.trim() ?? '');
    this.usersService.updateUserData(userData).subscribe({
      next: (data) => (this.user = data),
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
      complete: () => {
        this.clearPicture();
        this.isLoading = false;
        this.router.navigateByUrl(`/users/${this.user!.id}`);
      },
    });
  }
  submitAvatar() {
    this.isAvatarUploading = true;
    const userData = new FormData();
    userData.append('uploadAvatar', this.fileToUpload!);
    this.usersService.updateUserData(userData).subscribe({
      next: (data) => {
        this.authService.updateAvatar(data);
        this.user!.avatar = data.avatar;
      },
      error: (err) => {
        console.log(err);
        this.isAvatarUploading = false;
      },
      complete: () => {
        this.clearPicture();
        this.isAvatarUploading = false;
      },
    });
  }
  ngOnDestroy(): void {}
}
