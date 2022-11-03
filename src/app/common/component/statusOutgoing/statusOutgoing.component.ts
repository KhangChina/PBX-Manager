import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-statusOutgoing',
  templateUrl: './statusOutgoing.component.html',
  styleUrls: ['./statusOutgoing.component.scss']
})
export class StatusOutgoingComponent implements OnInit {

  constructor() { }
  @Input() status
  ngOnInit() {
  }

}
