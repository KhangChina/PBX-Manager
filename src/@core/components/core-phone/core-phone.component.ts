import {  Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as JsSIP from 'jssip'
import { CoreChatComponent } from '../core-chat/core-chat.component';
import { Pjsip } from './common/pjsip';
import { Session } from './common/session'
import { ToastrService,GlobalConfig } from 'ngx-toastr';
@Component({
  selector: 'core-phone',
  templateUrl: './core-phone.component.html',
  styleUrls: ['./core-phone.component.scss'],
  encapsulation: ViewEncapsulation.None,
 
})
export class CorePhoneComponent implements OnInit {
  
  constructor(private _coreSidebarService: CoreSidebarService, private modalService: NgbModal,private toastr: ToastrService) { }
  smsSound : any
  callSound : any
  phoneBook: any = [
    {
      name: "Webphone 125",
      value: 125,
      id:"125",
      contact:'sip:125@192.168.100.65'
    },
    {
      name: "Webphone 127",
      value: 127,
      id:"127",
      contact:'sip:127@192.168.100.65'
    },
    {
      name: "Devphone 123",
      value: 123,
      id:"123",
      contact:'sip:123@192.168.100.65'
    }
  ]
  ngOnInit(): void {
   
    this.pjsip = new Pjsip()
    this.uiRefreshSIP(2, "")
    this.uiRefreshWeb(2, "")
    this.btnReg = false
    this.btnUnReg = false
    //this.detectDevice()

   this.smsSound = new Audio('../../../assets/audio/sms.mp3');
   this.callSound =  new Audio('../../../assets/audio/call.mp3');
  }
  modalOpenBD(modalBD) {
    this.modalService.open(modalBD, {
      backdrop: false,
      centered: true,
      windowClass: 'modal modal-primary',
      size: 'lg'
    });
    this.toggleSidebar('phone')
  }
  toggleSidebar(key): void {
    if(key === "chat")
    {
      this.notify = 0
    }
    this.modalPhone = this._coreSidebarService.getSidebarRegistry(key).toggleOpen();
   
  }
 
  @Input() pjsip: Pjsip
  @ViewChild('localVideo')
  localVideo!: ElementRef;
  @ViewChild('remoteVideo')
  remoteVideo!: ElementRef
  @ViewChild('modalIncomingUI')
  modalIncomingUI!: ElementRef

  @ViewChild(CoreChatComponent) child: CoreChatComponent;

  modalIncoming: any
  modalCallAudio: any
  modalCallVideo: any
  modalLogin: any
  modalPhone : any

  public callSession: Session = new Session("", "")

  txtSipServer = true
  txtWebServer: boolean = true
  txtUser: boolean = true
  txtPass: boolean = true
  btnUnReg: boolean = false
  btnReg: boolean = true
  btnHangup: boolean = true
  btnLogin: boolean = false
  btnMute : boolean = true
  btnOffVideo :boolean = true

  txtCall: boolean = true
  btnCallAudio: boolean = true
  btnCallVideo: boolean = true
  selectPhoneNumber: number = null
  loading: boolean = false
  selectPhoneBook: boolean = true
  
  notify : number = 0

  statusSip: string = ""
  statusWeb: string = ""
  statusMute : boolean = true
  statusVideo : boolean = true

  checkSIP: boolean = false
  checkWeb: boolean = false

  sessionIncoming : any

  @Input() userProfileChat: any;
  @Input() userSender: any;
  @Input() messageUser: string;
  @Input() messageSender: string;

  btnMsg :boolean = true
  startSipPhone() {
    let socket = new JsSIP.WebSocketInterface(this.pjsip.webServer);
    let configuration = {
      sockets: [socket],
      uri: `sip:${this.pjsip.user}@${this.pjsip.sipServer}`,
      password: this.pjsip.pass
    };
    this.callSession.sipPhone = new JsSIP.UA(configuration);

    this.callSession.sipPhone.on('connected', (e: any) => {
      this.uiRefreshWeb(1, JSON.stringify(e))
      this.uiRefresh()
    });

    this.callSession.sipPhone.on('disconnected', (e: any) => {
      console.log(JSON.stringify(e))
      this.uiRefreshWeb(2, "")
      this.uiRefresh()
    });

    this.callSession.sipPhone.on('registered', (e: any) => {
      this.uiRefreshSIP(1, "")
      this.uiRefresh()
    });

    this.callSession.sipPhone.on('unregistered', (e: any) => {
      this.uiRefreshSIP(2, "")
      this.uiRefresh()
    });

    this.callSession.sipPhone.on('registrationFailed', (e: any) => {
      this.uiRefreshSIP(3, JSON.stringify(e))
      this.uiRefresh()
    });
    this.callSession.sipPhone.on('newRTCSession', (e: any) => {
      console.log("incoming newRTCSession")
      this.sessionIncoming = e.session;
      if (this.sessionIncoming.direction === "incoming") {
        this.callSound.play()
        this._coreSidebarService.getSidebarRegistry('phone').close()
        this.modalIncoming = this.modalService.open(this.modalIncomingUI, {
          backdrop: false,
          centered: true,
          windowClass: 'modal modal-primary',
          size: 'lg'
        })
        this.callSession.session = this.sessionIncoming
        // incoming call here
        this.sessionIncoming.on("accepted", () => {
          console.log("incoming accepted")
          this.uiCalling()
         this.stopAudioCall()
        });
        this.sessionIncoming.on("confirmed", () => {
          console.log("incoming confirmed")
         this.stopAudioCall()
          this.remoteVideo.nativeElement.srcObject = this.callSession.session.connection.getRemoteStreams()[0]
          this.localVideo.nativeElement.srcObject = this.callSession.session.connection.getLocalStreams()[0]
        });
        this.sessionIncoming.on("ended", () => {
          console.log("incoming ended")
          if (this.modalIncoming) {
            this.modalIncoming.close()
          }
          this.stopAudioCall()
          this.uiRefresh()
        });
        this.sessionIncoming.on("failed", () => {
          console.log("incoming failed")
         this.stopAudioCall()
          if (this.modalIncoming) {
            this.modalIncoming.close()
          }
          this.uiRefresh()
          // unable to establish the call
        });
      }
    });

    this.callSession.sipPhone.on('newMessage', (e: any) =>{ 
      
      
      if(e.request.constructor.name === "IncomingRequest")
      {
        this.smsSound.play();
        const dataMesinger = e.request
        this.messageSender = dataMesinger.body
        this.userSender ={
          id: parseInt(dataMesinger.from._uri._user), //sip
          fullName: dataMesinger.from._uri._user,
          status: 'online',
          contact:`sip:${dataMesinger.from._uri._user}@${dataMesinger.from._uri._host}`
        }
        this.child.receiveMsg(this.userSender,this.messageSender)
        this.toastr.info(this.messageSender, 'New Messages!', {
          progressBar: true,
          toastClass: 'toast ngx-toastr',
          closeButton: true,
          
        });
        this.notify+=1
      }
     });
     
    this.callSession.sipPhone.start();

  }
  register() {
    
    this.txtSipServer = true
    this.txtWebServer = true
    this.txtUser = true
    this.txtPass = true
    this.btnUnReg = false
    this.btnReg = true
    

    this.loading = true
    this.startSipPhone()
    this.loading = false
    this.modalLogin.close()
    this.toggleSidebar('phone')
    
   // console.log(this.modalPhone)
  }
  unRegister() {
    this.uiRefreshSIP(2, "")
    this.uiRefreshWeb(2, "")
    this.uiRefresh()
    if (this.callSession.sipPhone) {
      this.callSession.sipPhone.unregister()
      this.callSession.sipPhone.stop()
    }

    this.txtSipServer = false
    this.txtWebServer = false
    this.txtUser = false
    this.txtPass = false
    this.btnUnReg = true
    this.btnReg = false
    this.loading = false
  }

  uiRefreshSIP(checkSIP: number, statusContent: string) {
    switch (checkSIP) {
      case 1: {
        this.checkSIP = true
        this.statusSip = "Sip Registered"
        break;
      }
      case 2: {
        this.checkSIP = false
        this.statusSip = "Sip Unregistered"
        break;
      }
      case 3: {
        this.checkSIP = false
        this.statusSip = "Sip Registration Failed"
      }
      case 4: {
        this.checkSIP = false
        this.statusSip = "Sip: " + statusContent
      }
    }
  }

  uiRefreshWeb(checkWeb: number, statusContent: string) {
    switch (checkWeb) {
      case 1: {
        this.checkWeb = true
        this.statusWeb = "Web Socket Connected"
        break;
      }
      case 2: {
        this.checkWeb = false
        this.statusWeb = "Web Socket Disconnected " + statusContent
        break;
      }
    }

  }
  uiRefresh() {
    if (this.checkSIP && this.checkWeb) {
      this.txtCall = false
      this.selectPhoneBook = false
      this.btnMsg = false
      this.userProfileChat ={
        id: this.pjsip.user,
        fullName:this.pjsip.user,
        status: 'online',
      }
    }
    else {
      this.btnCallAudio = true
      this.btnCallVideo = true
      this.txtCall = true
      this.btnMsg = true
    }
    this.btnHangup = true
    this.selectPhoneNumber = null
    this.btnMute = true
    this.btnOffVideo = true

    this.remoteVideo.nativeElement.srcObject = null
    this.localVideo.nativeElement.srcObject = null
  }

  uiCalling()
  {
    this.btnHangup = false
    this.btnLogin = true
    this.btnCallAudio = true
    this.btnCallVideo = true
    this.btnMute = false
    this.txtCall = true
    this.selectPhoneBook = true
    
  }
  
  checkCallNumber() {
    if (this.selectPhoneNumber === null) {

      this.btnCallVideo = true
      this.btnCallAudio = true
    }
    else {

      this.btnCallVideo = false
      this.btnCallAudio = false
    }
  }

  callVideo() {
    this.btnOffVideo = false
    this.pjsip.video = true
    this.call()
  }
  callAudio() {
    this.pjsip.video = false
    this.call()

  }
  hangup() {
    this.callSession.session.terminate()
    this.stopAudioCall()
    
    if (this.modalIncoming) {
      this.modalIncoming.close()
    }
    this.uiRefresh()
  }
  call() {
    var eventHandlers = {
      progress: (e: any) => {
        console.log("progress")
        this.uiCalling()
      },

      failed: (e: any) => {
        console.log('call failed with cause :' + e.cause)
        this.uiRefresh()
      },

      ended: (e: any) => {
        console.log('call ended')
        this.uiRefresh()
      },

      confirmed: (e: any) => {
        console.log('call confirmed')
        this.remoteVideo.nativeElement.srcObject = this.callSession.session.connection.getRemoteStreams()[0]
        this.localVideo.nativeElement.srcObject = this.callSession.session.connection.getLocalStreams()[0]
      }

    };
    var options = {
      eventHandlers: eventHandlers,
      mediaConstraints: { audio: true, video: this.pjsip.video }
    };

    this.callSession.session = this.callSession.sipPhone.call(`sip:${this.selectPhoneNumber}@${this.pjsip.sipServer}`, options)
  }
  createLogin(modalLogin) {

    this.modalLogin = this.modalService.open(modalLogin, {
      backdrop: false,
      centered: true,
      windowClass: 'modal modal-primary',
      size: 'sm'
    });
    this.toggleSidebar('phone');
  }
  answerCallAudio() {
    var callOptions = {
      mediaConstraints: {
        audio: true, // only audio calls
        video: false
      }
    }
    
    this.callSession.session.answer(callOptions)
    this.modalIncoming.close()
    this.toggleSidebar('phone')
    this.btnOffVideo = true
  }
  answerCallVideo() {
    var callOptions = {
      mediaConstraints: {
        audio: true, // only audio calls
        video: true
      }
    }
    this.btnOffVideo = false
    this.callSession.session.answer(callOptions)
    this.modalIncoming.close()
    this.toggleSidebar('phone')
  }
  muteCall()
  {  
   
    let checkMute = this.sessionIncoming.isMuted()
    
    if(checkMute.audio)
    {
      //console.log(checkMute)
      this.sessionIncoming.unmute({
        audio:true,//not use audio properties
        video:false  // use camera properties
      })
      this.statusMute = checkMute.audio
     // console.log("unmute: "+this.statusMute)
     
    }
    else
    {
      //console.log(checkMute)
      this.sessionIncoming.mute({
        audio:true,//not use audio properties
        video:false  // use camera properties
      })
      this.statusMute = checkMute.audio
     // console.log("mute: "+this.statusMute)
    
    }
  }
  offVideo(){
    let checkVideo = this.sessionIncoming.isMuted()
    console.log(checkVideo)
    if(checkVideo.video)
    {
      console.log("On camera")
      this.sessionIncoming.unmute({
        audio:false,//not use audio properties
        video:true  // use camera properties
      })
      this.statusVideo = checkVideo.video
    }
    else
    {
      console.log("Off camera")
      this.sessionIncoming.mute({
        audio:false, //not use audio properties
        video:true // use camera properties
      })
      this.statusVideo = checkVideo.video
    }
  }

  stopAudioCall()
  {
    this.callSound.pause();
    this.callSound.currentTime = 0;
  }
 

}

