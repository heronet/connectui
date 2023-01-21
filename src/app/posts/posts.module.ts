import { NgModule } from '@angular/core';

import { PostsRoutingModule } from './posts-routing.module';
import { HomeComponent } from '../home/home.component';
import { PostComponent } from './post/post.component';
import { PostsComponent } from './posts.component';
import { AddCommentComponent } from './comments/add-comment/add-comment.component';
import { CommentsComponent } from './comments/comments.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostImagesComponent } from './post-images/post-images.component';
import { PostPreviewComponent } from './post-preview/post-preview.component';
import { SharedModule } from '../shared/shared.module';

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
  imports: [PostsRoutingModule, SharedModule],
})
export class PostsModule {}
