import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
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



  constructor(
  
    private _coreSidebarService: CoreSidebarService
  ) {
    // Set the private defaults
  }
  ngOnInit(): void {

  }



  toggleSidebar(key): void {
    this._coreSidebarService.getSidebarRegistry(key).toggleOpen();
  }
}
