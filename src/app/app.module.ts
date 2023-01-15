import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatsComponent } from './chats/chats.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UsersComponent } from './users/users.component';
import { ChatComponent } from './chats/chat/chat.component';
import { HomeComponent } from './home/home.component';
import { ConnectionsComponent } from './connections/connections.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './posts/post/post.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { AutosizeDirective } from './autosize.directive';
import { PostPreviewComponent } from './posts/post-preview/post-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatsComponent,
    LoginComponent,
    RegisterComponent,
    UsersComponent,
    ChatComponent,
    HomeComponent,
    ConnectionsComponent,
    PostsComponent,
    PostComponent,
    CreatePostComponent,
    AutosizeDirective,
    PostPreviewComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
