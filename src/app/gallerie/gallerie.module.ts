import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GalleriePage } from './gallerie.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { GalleriePageRoutingModule } from './gallerie-routing.module';
import { StoriesComponent } from '../stories/stories.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    GalleriePageRoutingModule
  ],
  declarations: [GalleriePage,StoriesComponent]
})
export class GalleriePageModule {}
