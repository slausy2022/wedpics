import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserGalleriePage } from './usergallerie.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { UserGalleriePageRoutingModule } from './usergallerie-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    UserGalleriePageRoutingModule
  ],
  declarations: [UserGalleriePage]
})
export class UserGalleriePageModule {}
