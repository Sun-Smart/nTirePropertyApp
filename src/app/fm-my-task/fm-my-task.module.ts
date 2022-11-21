import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FmMyTaskPageRoutingModule } from './fm-my-task-routing.module';

import { FmMyTaskPage } from './fm-my-task.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FmMyTaskPageRoutingModule
  ],
  declarations: [FmMyTaskPage]
})
export class FmMyTaskPageModule {}
