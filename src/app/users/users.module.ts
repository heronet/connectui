import { NgModule } from '@angular/core';

import { UsersRoutingModule } from './users-routing.module';
import { ConnectionsComponent } from './connections/connections.component';
import { UsersComponent } from './users.component';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from '../shared/shared.module';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';

@NgModule({
  declarations: [UsersComponent, ConnectionsComponent, ProfileComponent, EditProfileComponent],
  imports: [SharedModule, UsersRoutingModule],
})
export class UsersModule {}
