import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FmDocumentExpiryReportPage } from './fm-document-expiry-report.page';

const routes: Routes = [
  {
    path: '',
    component: FmDocumentExpiryReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FmDocumentExpiryReportPageRoutingModule {}
