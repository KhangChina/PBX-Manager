import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PbxContextComponent } from './pbx-context.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PbxContextComponent,
    data: { animation: 'pbx-context' }
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  declarations: [PbxContextComponent]
})
export class PbxContextModule { }
