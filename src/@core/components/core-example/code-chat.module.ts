import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';

import { CoreDirectivesModule } from '@core/directives/directives';
import { CoreSidebarModule } from '@core/components/core-sidebar/core-sidebar.module';
import { CoreChatComponent } from './core-chat.component';




@NgModule({
  declarations: [CoreChatComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    PerfectScrollbarModule,
    CoreDirectivesModule,
    CoreSidebarModule
  ],
  exports: [CoreChatComponent]
})
export class CoreChatModule {}
