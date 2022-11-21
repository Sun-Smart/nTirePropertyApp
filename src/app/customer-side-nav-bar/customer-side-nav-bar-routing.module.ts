import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerSideNavBarPage } from './customer-side-nav-bar.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerSideNavBarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerSideNavBarPageRoutingModule {}
