import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from '../user/user.component';
import { AuthGuard } from 'app/services/auth-guard';

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule),
       
      },
      {
        path: 'user-manager',
        component: UserComponent,
        data: { animation: 'user-manager' }
      },
      {
        path: 'phone-account',
        loadChildren: () => import('../phone-account/phone-account.module').then(m => m.PhoneAccountModule),
       
      },
      {
        path: 'phone-log',
        loadChildren: () => import('../phone-log/phone-log.module').then(m => m.PhoneLogModule),
      },
      {
        path: 'pbx-context',
        loadChildren: () => import('../pbx-context/pbx-context.module').then(m => m.PbxContextModule),
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
