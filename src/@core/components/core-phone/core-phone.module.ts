import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CoreSidebarModule } from '@core/components/core-sidebar/core-sidebar.module';
import { CorePhoneComponent } from '@core/components/core-phone/core-phone.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreChatModule } from '../core-chat/code-chat.module';

@NgModule({
  declarations: [CorePhoneComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    PerfectScrollbarModule,
    CoreDirectivesModule,
    CoreSidebarModule,
    NgSelectModule,
    NgbModule,
    CoreChatModule
  ],
  providers: [],
  exports: [CorePhoneComponent]
})
export class CorePhoneModule {}
