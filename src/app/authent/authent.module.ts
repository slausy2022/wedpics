import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthentPageRoutingModule } from './authent-routing.module';

import { AuthentPage } from './authent.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthentPageRoutingModule
  ],
  declarations: [AuthentPage]
})
export class AuthentPageModule {}
