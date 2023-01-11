import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthDto } from 'src/app/auth/authdto';
import { Chat } from 'src/app/models/chat';
import { Message } from 'src/app/models/message';
import { UsersService } from 'src/app/users/users.service';
import { ChatsService } from '../chats.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  titleEditMode = false;
  chat: Chat | undefined;
  authData: AuthDto | undefined = undefined;
  chatSub = new Subscription();
  messageSub = new Subscription();
  signalRSub = new Subscription();

  constructor(
    private chatService: ChatsService,
    private usersService: UsersService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.authService.authData$.pipe(take(1)).subscribe({
      next: (authData) => (this.authData = authData),
      error: (err) => console.log(err),
    });
    this.chatSub = this.chatService.chat$.subscribe({
      next: (chat) => (this.chat = chat),
      error: (err) => console.log(err),
    });
    this.messageSub = this.chatService.message$.subscribe({
      next: (message) => {
        console.log('GOT MSG', message);
        if (message.chatId === this.chat?.id) {
          this.chat.messages.push(message);
        }
      },
      error: (err) => console.log(err),
    });
    this.signalRSub = this.chatService.signalrConnected$.subscribe({
      next: (signalrConnected) => {
        if (signalrConnected)
          this.chatService.fetchChat(this.route.snapshot.params['id']);
      },
    });
  }
  sendMessage(form: NgForm) {
    const message: Partial<Message> = {
      chatId: this.chat?.id ?? '',
      text: form.value.messageText,
    };
    if (form.value.messageText.trim()) this.chatService.sendMessage(message);
    form.resetForm();
  }
  changeName(form: NgForm) {
    if (!form.value.title) {
      this.titleEditMode = !this.titleEditMode;
      return;
    }
    this.usersService.renameChat(this.chat!.id, form.value.title).subscribe({
      next: (chat) => {
        this.chat!.title = chat.title!;
        form.resetForm();
        this.titleEditMode = !this.titleEditMode;
      },
      error: (err) => console.log(err),
    });
  }
  ngOnDestroy(): void {
    this.chatSub.unsubscribe();
    this.messageSub.unsubscribe();
    this.signalRSub.unsubscribe();
  }
}
