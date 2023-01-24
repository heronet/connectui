import {
  AfterViewChecked,
  Component,
  DoCheck,
  ElementRef,
  IterableDiffers,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
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
export class ChatComponent
  implements OnInit, OnDestroy, DoCheck, AfterViewChecked
{
  @ViewChild('scrollable') private scrollable: ElementRef | undefined;
  private shouldScrollDown: boolean | undefined;
  private iterableDiffer: any;
  numberOfMessagesChanged: boolean | undefined;
  isLoading = false;
  titleEditMode = false;
  chat: Chat | undefined;
  chatTitle: string | undefined;
  authData: AuthDto | undefined = undefined;
  signalRConnected = false;
  chatSub = new Subscription();
  messageSub = new Subscription();
  signalRSub = new Subscription();
  messagesSkip = 0;
  messagesTake = 50;
  canLoadMore: boolean | undefined;
  constructor(
    private chatService: ChatsService,
    private usersService: UsersService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private iterableDiffers: IterableDiffers
  ) {
    this.iterableDiffer = this.iterableDiffers.find([]).create(undefined);
  }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => this.getChat(params['id']),
    });
    this.authService.authData$.pipe(take(1)).subscribe({
      next: (authData) => (this.authData = authData),
      error: (err) => console.log(err),
    });
    this.chatSub = this.chatService.chat$.subscribe({
      next: (chat) => {
        this.chat = chat;
        if (!this.titleEditMode) this.chatTitle = chat.title;
      },
      error: (err) => console.log(err),
    });
    this.messageSub = this.chatService.message$.subscribe({
      next: (message) => {
        if (message.chatId === this.chat?.id) {
          this.chat.messages.push(message);
          this.scrollToBottom();
        }
      },
      error: (err) => console.log(err),
    });
    this.signalRSub = this.chatService.signalrConnected$.subscribe({
      next: (signalrConnected) => {
        if (signalrConnected) this.signalRConnected = signalrConnected;
      },
    });
  }
  getChat(id: string) {
    this.isLoading = true;
    this.chatService
      .getChat(id, this.messagesSkip, this.messagesTake)
      .subscribe({
        next: (chat) => {
          if (!this.titleEditMode) this.chatTitle = chat.title;
          if (!this.chat) {
            this.chat = chat;
          } else {
            this.chat.messages.unshift(...chat.messages);
          }
          this.messagesSkip += this.messagesTake;
          if (chat.messages.length < this.messagesTake)
            this.canLoadMore = false;
          else this.canLoadMore = true;
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        },
      });
  }
  sendMessage(form: NgForm) {
    const text = form.value.messageText?.trim();
    if (!text) return;
    const message: Partial<Message> = {
      chatId: this.chat?.id ?? '',
      text,
    };
    if (this.signalRConnected) this.chatService.sendMessage(message);
    form.resetForm();
  }
  changeName(form: NgForm) {
    if (!this.chatTitle) {
      this.titleEditMode = !this.titleEditMode;
      return;
    }
    this.usersService.renameChat(this.chat!.id, this.chatTitle!).subscribe({
      next: (chat) => {
        this.chat!.title = chat.title!;
        form.resetForm();
        this.titleEditMode = !this.titleEditMode;
      },
      error: (err) => console.log(err),
    });
  }
  ngDoCheck(): void {
    if (this.iterableDiffer.diff(this.chat?.messages)) {
      this.numberOfMessagesChanged = true;
    }
  }

  ngAfterViewChecked(): void {
    const isScrolledDown =
      Math.abs(
        this.scrollable?.nativeElement.scrollHeight -
          this.scrollable?.nativeElement.scrollTop -
          this.scrollable?.nativeElement.clientHeight
      ) <= 3.0;

    if (this.numberOfMessagesChanged && !isScrolledDown) {
      this.scrollToBottom();
      this.numberOfMessagesChanged = false;
    }
  }

  scrollToBottom() {
    try {
      this.scrollable!.nativeElement.scrollTop =
        this.scrollable!.nativeElement.scrollHeight;
    } catch (e) {
      console.error(e);
    }
  }
  ngOnDestroy(): void {
    this.chatSub.unsubscribe();
    this.messageSub.unsubscribe();
    this.signalRSub.unsubscribe();
  }
}
