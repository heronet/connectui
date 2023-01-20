import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ConnectionsComponent } from './connections/connections.component';
import { UsersComponent } from './users.component';

@NgModule({
  declarations: [UsersComponent, ConnectionsComponent],
  imports: [CommonModule, UsersRoutingModule],
})
export class UsersModule {}
