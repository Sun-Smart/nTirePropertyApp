import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerPropertyDetailsPage } from './customer-property-details.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerPropertyDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerPropertyDetailsPageRoutingModule {}
