import { Component, OnInit, OnDestroy, ViewEncapsulation, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoreConfigService } from '@core/services/config.service';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

@Component({
  selector: 'core-chat',
  templateUrl: './core-chat.component.html',
  styleUrls: ['./core-chat.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CoreChatComponent implements OnInit {



  constructor( private _coreSidebarService: CoreSidebarService ) {}
  ngOnInit(): void {
    this. userProfileChat= {
      id: 369,
      avatar: 'assets/images/avatars/8.png',
      fullName: 'IT Support',
      status: 'online',
    }
    this.chats = {
      id: 1,
      userId: 2,
      unseenMsgs: 0,
      chat: [
        {
          message: 'Hi',
          time: 'Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)',
          senderId: 369
        },
        {
          message: 'Hello. How can I help You?',
          time: 'Mon Dec 11 2018 07:45:15 GMT+0000 (GMT)',
          senderId: 2
        },
        {
          message: 'Can I get details of my last transaction I made last month?',
          time: 'Mon Dec 11 2018 07:46:10 GMT+0000 (GMT)',
          senderId: 369
        },
        {
          message: 'We need to check if we can provide you such information.',
          time: 'Mon Dec 11 2018 07:45:15 GMT+0000 (GMT)',
          senderId: 2
        },
        {
          message: 'I will inform you as I get update on this.',
          time: 'Mon Dec 11 2018 07:46:15 GMT+0000 (GMT)',
          senderId: 2
        },
        {
          message: 'If it takes long you can mail me at my mail address.',
          time: 'dayBeforePreviousDay',
          senderId: 369
        }
      ]
    }
   }

  @ViewChild('scrollMe') scrollMe: ElementRef;
  scrolltop: number = null;
  
  public chatUser;
  public newChat;
  public chatMessage = '';
  public userProfileChat;
  public chats;

  updateChat() {
    this.newChat = {
      message: this.chatMessage,
      time: 'Mon Dec 10 2018 07:46:43 GMT+0000 (GMT)',
      senderId: this.userProfileChat.id
    };
    if (this.chatMessage !== '') {
      this.chats.chat.push(this.newChat);
    }
    this.chatMessage = '';
    setTimeout(() => {
      this.scrolltop = this.scrollMe?.nativeElement.scrollHeight;
    }, 0);
  }



  toggleSidebar(key): void {
    this._coreSidebarService.getSidebarRegistry(key).toggleOpen();
  }
  
}
