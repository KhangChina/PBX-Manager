import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneAccountComponent } from './phone-account.component';
import { RouterModule, Routes } from '@angular/router';
import { CoreCommonModule } from '@core/common.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CoreSidebarModule } from '@core/components';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';

const routes: Routes = [
  {
    path: '',
    component: PhoneAccountComponent,
    data: { animation: 'phone-account' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    CoreCommonModule,
    FormsModule,
    NgSelectModule,
    Ng2FlatpickrModule,
    CorePipesModule,
    CoreDirectivesModule,
    CoreSidebarModule
  ],
  declarations: [PhoneAccountComponent]
})
export class PhoneAccountModule { }
