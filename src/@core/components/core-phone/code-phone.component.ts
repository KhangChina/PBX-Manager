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
    this._coreSidebarService.getSidebarRegistry(key).toggleOpen();
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

  public callSession: Session = new Session("", "")

  txtSipServer = true
  txtWebServer: boolean = true
  txtUser: boolean = true
  txtPass: boolean = true
  btnUnReg: boolean = false
  btnReg: boolean = true
  btnHangup: boolean = true
  btnLogin: boolean = false

  txtCall: boolean = true
  btnCallAudio: boolean = true
  btnCallVideo: boolean = true
  selectPhoneNumber: number
  loading: boolean = false

  statusSip: string = ""
  statusWeb: string = ""

  checkSIP: boolean = false
  checkWeb: boolean = false

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
      var session = e.session;
      if (session.direction === "incoming") {
        console.log(session)
        this.toggleSidebar('phone')
        this.modalIncoming = this.modalService.open(this.modalIncomingUI, {
          backdrop: false,
          centered: true,
          windowClass: 'modal modal-primary',
          size: 'lg'
        })
        this.callSession.session = session
        // incoming call here
        session.on("accepted", () => {
          console.log("incoming accepted")
          this.uiCalling()
        });
        session.on("confirmed", () => {
          console.log("incoming confirmed")
          this.remoteVideo.nativeElement.srcObject = this.callSession.session.connection.getRemoteStreams()[0]
          this.localVideo.nativeElement.srcObject = this.callSession.session.connection.getLocalStreams()[0]
        });
        session.on("ended", () => {
          console.log("incoming ended")
          this.uiRefresh()
        });
        session.on("failed", () => {
          console.log("incoming failed")
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
      this.btnCallAudio = false
      this.btnCallVideo = false
      this.txtCall = false
      
    }
    else {
      this.btnCallAudio = true
      this.btnCallVideo = true
      this.txtCall = true
    }
    this.btnHangup = true
  }

  uiCalling()
  {
    this.btnHangup = false
    this.btnLogin = true
  }
  
  checkCallNumber() {

    if (this.selectPhoneNumber === null) {

      //this.btnCallVideo = true
    }
    else {

      //this.btnCallVideo = false
    }
  }

  callVideo() {
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
  }
  call() {
    var eventHandlers = {
      progress: (e: any) => {
        console.log("progress")
      },

      failed: (e: any) => {
        console.log('call failed with cause :' + e.cause)

      },

      ended: (e: any) => {
        console.log('call ended')

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
  answerVideoCall() {
    var callOptions = {
      mediaConstraints: {
        audio: true, // only audio calls
        video: true
      }
    }
    this.callSession.session.answer(callOptions)
    this.modalIncoming.close()
    this.toggleSidebar('phone')
  }

}


//_audioMuted