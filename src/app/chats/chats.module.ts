import { NgModule } from '@angular/core';

import { ChatsRoutingModule } from './chats-routing.module';
import { ChatComponent } from './chat/chat.component';
import { ChatsComponent } from './chats.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ChatComponent, ChatsComponent],
  imports: [ChatsRoutingModule, SharedModule],
})
export class ChatsModule {}
