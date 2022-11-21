import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FmPropetyContactListPage } from './fm-propety-contact-list.page';

const routes: Routes = [
  {
    path: '',
    component: FmPropetyContactListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FmPropetyContactListPageRoutingModule {}
