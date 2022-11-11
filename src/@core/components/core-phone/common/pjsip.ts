export class Pjsip {
    sipServer: string
    webServer: string
    user: string
    pass: string
    numberCall: string 
    audio: boolean
    video: boolean 
    answer : boolean

    constructor(){
       this.sipServer = "192.168.100.65:5060"
       this.webServer = "ws://192.168.100.65:8088/ws"
       this.user = "124"
       this.pass = "htgsoft@"
       this.audio = true
       this.video = false
       this.answer  = false
    }

}
