import { Component, Input } from '@angular/core';
import { Post } from 'src/app/models/post';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.scss'],
})
export class PostPreviewComponent {
  @Input() post: Post | undefined;
  @Input() userId: string | undefined;
  @Input() deletePost = (id: string) => {};
}
