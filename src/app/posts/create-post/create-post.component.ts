import { Component } from '@angular/core';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent {
  getHeight(content: string) {
    const v1 = Math.floor(content.length / 50);
    const v2 = content.split('\n').length;
    return Math.max(v1, v2);
  }
}
