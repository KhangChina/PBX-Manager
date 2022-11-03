import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageExampleComponent } from './page-example.component';
import { Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule } from '@core/components';
import { CoreDirectivesModule } from '@core/directives/directives';
import { CorePipesModule } from '@core/pipes/pipes.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { Ng2FlatpickrModule } from 'ng2-flatpickr';
const routes: Routes = [
  {
    path: '',
    component: PageExampleComponent,
    // data: { animation: 'outgoing-list' }
  }
];
@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    CoreCommonModule,
    FormsModule,
    NgSelectModule,
    Ng2FlatpickrModule,
    CorePipesModule,
    CoreDirectivesModule,
    CoreSidebarModule
  ],
  declarations: [PageExampleComponent]
})
export class PageExampleModule { }
