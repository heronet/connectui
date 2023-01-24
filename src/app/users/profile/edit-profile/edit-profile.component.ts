import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthDto } from 'src/app/auth/authdto';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent {
  isLoading = false;
  @Input() authData: AuthDto | undefined;
  @ViewChild('fileInput', { static: true }) fileInput:
    | ElementRef<HTMLInputElement>
    | undefined;
  fileToUpload: File | undefined;
  imageUrl: string | undefined;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private authService: AuthService
  ) {}
  handleFileInput() {
    const file = this.fileInput!.nativeElement.files![0];
    this.fileToUpload = file;
    let reader = new FileReader();
    reader.onload = (e) => {
      this.imageUrl = e.target!.result as string;
    };
    reader.readAsDataURL(file);
  }
  clearPicture() {
    this.fileToUpload = undefined;
    this.imageUrl = undefined;
    this.fileInput!.nativeElement.value = '';
  }
  submitData(form: NgForm) {
    // if (!form.value.name) return;
    this.isLoading = true;
    const data = form.value;
    const userData = new FormData();
    userData.append('uploadAvatar', this.fileToUpload!);
    if (data.name?.trim()) userData.append('name', data.name.trim());
    this.usersService.updateUserData(userData).subscribe({
      next: (data) => this.authService.updateAvatar(data),
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
      complete: () => {
        form.resetForm();
        this.clearPicture();
        this.isLoading = false;
        this.router.navigateByUrl('/');
      },
    });
  }
}
