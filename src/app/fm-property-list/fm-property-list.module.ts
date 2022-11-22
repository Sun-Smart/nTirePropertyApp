import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FmPropertyListPageRoutingModule } from './fm-property-list-routing.module';

import { FmPropertyListPage } from './fm-property-list.page';
import { HttpClient,HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FmPropertyListPageRoutingModule,
    HttpClientModule
  ],
  declarations: [FmPropertyListPage],
  providers:[HttpClient],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class FmPropertyListPageModule {}
