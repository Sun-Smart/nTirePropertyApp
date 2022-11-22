import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FmPropetyContactListPageRoutingModule } from './fm-propety-contact-list-routing.module';

import { FmPropetyContactListPage } from './fm-propety-contact-list.page';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FmPropetyContactListPageRoutingModule,
    HttpClientModule
  ],
  declarations: [FmPropetyContactListPage],
  providers:[HttpClient],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class FmPropetyContactListPageModule {}
