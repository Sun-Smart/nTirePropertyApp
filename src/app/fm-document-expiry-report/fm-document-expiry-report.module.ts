import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FmDocumentExpiryReportPageRoutingModule } from './fm-document-expiry-report-routing.module';

import { FmDocumentExpiryReportPage } from './fm-document-expiry-report.page';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FmDocumentExpiryReportPageRoutingModule,
    HttpClientModule
  ],
  declarations: [FmDocumentExpiryReportPage],
  providers:[HttpClient],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class FmDocumentExpiryReportPageModule {}
