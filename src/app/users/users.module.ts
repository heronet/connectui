import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ConnectionsComponent } from './connections/connections.component';
import { UsersComponent } from './users.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [UsersComponent, ConnectionsComponent, ProfileComponent],
  imports: [CommonModule, UsersRoutingModule],
})
export class UsersModule {}
