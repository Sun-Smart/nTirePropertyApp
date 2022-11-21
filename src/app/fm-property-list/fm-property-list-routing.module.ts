import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FmPropertyListPage } from './fm-property-list.page';

const routes: Routes = [
  {
    path: '',
    component: FmPropertyListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FmPropertyListPageRoutingModule {}
