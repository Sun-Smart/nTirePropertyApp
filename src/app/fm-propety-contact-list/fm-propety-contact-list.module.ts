import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FmPropetyContactListPageRoutingModule } from './fm-propety-contact-list-routing.module';

import { FmPropetyContactListPage } from './fm-propety-contact-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FmPropetyContactListPageRoutingModule
  ],
  declarations: [FmPropetyContactListPage]
})
export class FmPropetyContactListPageModule {}
