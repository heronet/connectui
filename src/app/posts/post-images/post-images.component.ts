import { Component, Input } from '@angular/core';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-post-images',
  templateUrl: './post-images.component.html',
  styleUrls: ['./post-images.component.scss'],
})
export class PostImagesComponent {
  @Input() post: Post | undefined;
  @Input() linear: boolean | undefined;
}
