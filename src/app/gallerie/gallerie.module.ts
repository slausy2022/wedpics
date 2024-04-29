import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GalleriePage } from './gallerie.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { FullscreenImageModalComponent } from '../fullscreen-image-modal/fullscreen-image-modal.component';
import { GalleriePageRoutingModule } from './gallerie-routing.module';
import { StoriesComponent } from '../stories/stories.component';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    GalleriePageRoutingModule
  ],
  declarations: [GalleriePage,StoriesComponent,FullscreenImageModalComponent],
  providers: [DatePipe],
})
export class GalleriePageModule {}
