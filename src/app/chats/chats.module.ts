import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatsRoutingModule } from './chats-routing.module';
import { ChatComponent } from './chat/chat.component';
import { ChatsComponent } from './chats.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ChatComponent, ChatsComponent],
  imports: [CommonModule, ChatsRoutingModule, FormsModule],
})
export class ChatsModule {}
