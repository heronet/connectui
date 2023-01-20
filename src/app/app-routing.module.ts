import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ChatComponent } from './chats/chat/chat.component';
import { ChatsComponent } from './chats/chats.component';
import { ConnectionsComponent } from './connections/connections.component';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './posts/post/post.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  {
    path: 'posts',
    children: [
      { path: '', component: HomeComponent },
      { path: ':id', component: PostComponent },
    ],
  },
  {
    path: 'chats',
    children: [
      { path: '', component: ChatsComponent },
      { path: ':id', component: ChatComponent },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'connections',
    component: ConnectionsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'posts' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
