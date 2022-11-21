import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FmMyTaskPage } from './fm-my-task.page';

const routes: Routes = [
  {
    path: '',
    component: FmMyTaskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FmMyTaskPageRoutingModule {}
