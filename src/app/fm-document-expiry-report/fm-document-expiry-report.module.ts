import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FmDocumentExpiryReportPageRoutingModule } from './fm-document-expiry-report-routing.module';

import { FmDocumentExpiryReportPage } from './fm-document-expiry-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FmDocumentExpiryReportPageRoutingModule
  ],
  declarations: [FmDocumentExpiryReportPage]
})
export class FmDocumentExpiryReportPageModule {}
