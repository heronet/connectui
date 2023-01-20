import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { HomeComponent } from '../home/home.component';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts.component';
import { AddCommentComponent } from './comments/add-comment/add-comment.component';
import { CommentsComponent } from './comments/comments.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostImagesComponent } from './post-images/post-images.component';
import { PostPreviewComponent } from './post-preview/post-preview.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    PostsComponent,
    PostComponent,
    CreatePostComponent,
    PostPreviewComponent,
    PostImagesComponent,
    CommentsComponent,
    AddCommentComponent,
  ],
  imports: [CommonModule, PostsRoutingModule, FormsModule],
})
export class PostsModule {}
