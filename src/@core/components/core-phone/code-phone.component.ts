import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as JsSIP from '../../../../node_modules/jssip/lib/JsSIP'
import { Pjsip } from './common/pjsip';
import { Session } from './common/session'

@Component({
  selector: 'core-phone',
  templateUrl: './core-phone.component.html',
  styleUrls: ['./core-phone.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CorePhoneComponent implements OnInit {
  constructor(private _coreSidebarService: CoreSidebarService, private modalService: NgbModal) { }

  phoneBook: any = [
    {
      name: "IT",
      value: 999
    },
    {
      name: "Software",
      value: 998
    },
    {
      name: "Hardware",
      value: 997
    },
  ]
  ngOnInit(): void {
    this.pjsip = new Pjsip()
    this.uiRefreshSIP(2, "")
    this.uiRefreshWeb(2, "")
    this.btnReg = false
    this.btnUnReg = false
    //this.detectDevice()
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
    this.modalPhone = this._coreSidebarService.getSidebarRegistry(key).toggleOpen();
  }

  @Input() pjsip: Pjsip
  @ViewChild('localVideo')
  localVideo!: ElementRef;
  @ViewChild('remoteVideo')
  remoteVideo!: ElementRef
  @ViewChild('modalIncomingUI')
  modalIncomingUI!: ElementRef

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
  

  statusSip: string = ""
  statusWeb: string = ""
  statusMute : boolean = true
  statusVideo : boolean = true

  checkSIP: boolean = false
  checkWeb: boolean = false

  sessionIncoming : any
  startSipPhone() {
    console.log(this.pjsip.webServer + " start")
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
      this.sessionIncoming = e.session;
      if (this.sessionIncoming.direction === "incoming") {
        //console.log(this.sessionIncoming)
        //console.log(this.sessionIncoming.isMuted())
        this._coreSidebarService.getSidebarRegistry('phone').close()
        //this.toggleSidebar('phone')
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
        });
        this.sessionIncoming.on("confirmed", () => {
          console.log("incoming confirmed")
          this.remoteVideo.nativeElement.srcObject = this.callSession.session.connection.getRemoteStreams()[0]
          this.localVideo.nativeElement.srcObject = this.callSession.session.connection.getLocalStreams()[0]
        });
        this.sessionIncoming.on("ended", () => {
          console.log("incoming ended")
          if (this.modalIncoming) {
            this.modalIncoming.close()
          }
          this.uiRefresh()
        });
        this.sessionIncoming.on("failed", () => {
          console.log("incoming failed")
          if (this.modalIncoming) {
            this.modalIncoming.close()
          }
          this.uiRefresh()
          // unable to establish the call
        });
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
    
      
    }
    else {
      this.btnCallAudio = true
      this.btnCallVideo = true
      this.txtCall = true
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
}
