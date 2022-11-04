import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneLogComponent } from './phone-log.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: PhoneLogComponent,
    data: { animation: 'phone-log' }
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
   
  ],
  declarations: [PhoneLogComponent]
})
export class PhoneLogModule { }
