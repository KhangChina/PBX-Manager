import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UserComponent } from '../user/user.component';
import { AuthGuard } from 'app/services/auth-guard';

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: { animation: 'dashboard' }
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { animation: 'dashboard' }
      },
      {
        path: 'user-manager',
        component: UserComponent,
        data: { animation: 'dashboard' }
      },
      {
        path: 'phone-account',
        loadChildren: () => import('../phone-account/phone-account.module').then(m => m.PhoneAccountModule),
       
      },
    ]
  }
]


@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
})
export class AdminModule { }
