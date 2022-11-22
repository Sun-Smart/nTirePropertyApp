import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FmAdditionalPagePageRoutingModule } from './fm-additional-page-routing.module';

import { FmAdditionalPagePage } from './fm-additional-page.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FmAdditionalPagePageRoutingModule,HttpClientModule
  ],
  declarations: [FmAdditionalPagePage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
  providers:[DatePipe]
})
export class FmAdditionalPagePageModule {}
