import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthLoginV2Component } from '../auth-login-v2/auth-login-v2.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreCommonModule } from '@core/common.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ErrorComponent } from '../error/error.component';


const routes: Routes = [
  {
    path: 'login',
    component: AuthLoginV2Component,
    data: { animation: 'auth' }
  }, {
    path: 'error404',
    component: ErrorComponent,
    data: { animation: 'misc' }
  }

];


@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), NgbModule, FormsModule, ReactiveFormsModule, CoreCommonModule,CommonModule,
    CoreCommonModule,
    
    NgbModule,
    NgSelectModule,
    FormsModule,
    ],
    declarations: [AuthLoginV2Component,ErrorComponent],
})
export class ClientModule { }


