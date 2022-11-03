import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { faker } from '@faker-js/faker';
@Component({
  selector: 'app-phone-account',
  templateUrl: './phone-account.component.html',
  styleUrls: ['./phone-account.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PhoneAccountComponent implements OnInit {
  constructor() { }
  ngOnInit() { this.fakeData()}
  public selectRole: any = [
    {name : 'All', value: ''},
    {name : 'Context 1', value: '1'},
    {name : 'Context 2', value: '2'},
    {name : 'Context 3', value: '3'}
    ];

  public selectStatus: any = [
  {name : 'All', value: ''},
  {name : 'Offline', value: 'Offline'},
  {name : 'Active', value: 'Active'},
  {name : 'Deactivate', value: 'Deactivate'}
  ];

  public listSip: any= [] 
  async fakeData() {
    for (let index = 0; index <10; index++) {
      let item = {
        "Name": faker.name.fullName(), //"Hà Thảo, Nguyên",
        "Sip": faker.finance.account(3), //232
        "Create": faker.date.between('2020-01-01T00:00:00.000Z', new Date()).toISOString(),//"2022-02-24",
        "Context":"P_0000000"+faker.finance.account(3)+"_"+"00"+faker.finance.account(1),//"P000000232_003",
        "Ip": faker.internet.ipv4().toString(),
        "Status": this.getRandomInt(2).toString(), //0 or 1  
      }
      this.listSip.push(item)
    }
  }
  getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

}
