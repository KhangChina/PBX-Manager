import { Component, OnInit, OnDestroy, ViewEncapsulation, ElementRef, ViewChild, Input } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

@Component({
  selector: 'core-chat',
  templateUrl: './core-chat.component.html',
  styleUrls: ['./core-chat.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CoreChatComponent implements OnInit {

  @Input() userProfileChat: any;
  @Input() userSender: any;
  @Input() messageUser: string;
  @Input() messageSender: string;
  @Input() phoneSession : any
  @Input() phoneBook: any
 
  constructor( private _coreSidebarService: CoreSidebarService ) {}
  ngOnInit(): void {
    
    this. userProfileChat= {
      id: 369, //sip
      fullName: 'IT Support',
      status: 'online',
    }
    this.chats = [
    {
      id: 2,
      userId: 127,
      unseenMsgs: 0,
      chat: [
        {
          message: 'Hi',
          time: 'Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)',
          senderId: this.userProfileChat.id
        },
        {
          message: 'Hello. How can I help You 127?',
          time: 'Mon Dec 11 2018 07:45:15 GMT+0000 (GMT)',
          senderId: 127
        },
        {
          message: 'Can I get details of my last transaction I made last month?',
          time: 'Mon Dec 11 2018 07:46:10 GMT+0000 (GMT)',
          senderId: this.userProfileChat.id
        }
      ]
    },
    {
      id: 1,
      userId: 123,
      unseenMsgs: 0,
      chat: [
        {
          message: 'Hi',
          time: 'Mon Dec 10 2018 07:45:00 GMT+0000 (GMT)',
          senderId: this.userProfileChat.id
        },
        {
          message: 'Hello. How can I help You 123?',
          time: 'Mon Dec 11 2018 07:45:15 GMT+0000 (GMT)',
          senderId: 123
        },
        {
          message: 'Can I get details of my last transaction I made last month?',
          time: 'Mon Dec 11 2018 07:46:10 GMT+0000 (GMT)',
          senderId: this.userProfileChat.id
        }
        ]
      },
  ]
   }

  @ViewChild('scrollMe') scrollMe: ElementRef;
  scrolltop: number = null;
  
  public chatUser;
  public newChat;
  public chatMessage = '';
  public chats : any

  convention : any
  
  updateChat() {
    this.newChat = {
      message: this.messageUser,
      time: 'Mon Dec 10 2018 07:46:43 GMT+0000 (GMT)',
      senderId: this.userProfileChat.id
    };
    if (this.messageUser !== '') {

      this.chats.map(c =>{
        if(c.userId == this.userSender.id)
        {
          c.chat.push(this.newChat)

        }
      })
    }
    this.messageUser = '';
    setTimeout(() => {
      this.scrolltop = this.scrollMe?.nativeElement.scrollHeight;
    }, 0);
  }

  toggleSidebar(key): void {
    this._coreSidebarService.getSidebarRegistry(key).toggleOpen();
  }

  openMessager(key,item): void {

    this.userSender = {
      id: item.id, //sip
      fullName: item.fullName,
      status: item.status,
      contact:item.contact
    }
    this.convention=null
    this.chats.map(c =>{
      if(c.userId == item.id)
      {
       this.convention = c    
      }

    })
    this._coreSidebarService.getSidebarRegistry(key).toggleOpen();
    
  }

  send()
  {
    if (this.messageUser !== '')
    {
      var eventHandlers = {
        succeeded: function(e){ 
          console.log("succeeded")
         },
        failed: function(e){ 
          console.log("failed")
        }
      };
      
      var options = {
        eventHandlers: eventHandlers
      };
      this.phoneSession.sendMessage(this.userSender.contact, this.messageUser, options)
    }
    this.updateChat()
   
  }

   receiveMsg(chatUser,chatMessage)
  {
    
      this.newChat = {
        message: chatMessage,
        time: 'Mon Dec 10 2018 07:46:43 GMT+0000 (GMT)',
        senderId: chatUser.id
      };
      if (chatMessage !== '') {

        this.chats.map(c =>{
          if(c.userId == chatUser.id)
          {
            c.chat.push(this.newChat)
  
          }
        })
        
      }
      chatMessage = '';
      setTimeout(() => {
        this.scrolltop = this.scrollMe?.nativeElement.scrollHeight;
      }, 0);
     
  }
}
