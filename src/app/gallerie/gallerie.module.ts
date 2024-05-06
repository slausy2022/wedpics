import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GalleriePage } from './gallerie.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { FullscreenImageModalComponent } from '../fullscreen-image-modal/fullscreen-image-modal.component';
import { PublishPostModalComponent } from '../publish-post-modal/publish-post-modal.component';

import { GalleriePageRoutingModule } from './gallerie-routing.module';
import { StoriesComponent } from '../stories/stories.component';
import { DatePipe } from '@angular/common';
import { LikesIconColorPipe, LikesIconPipe } from './gallerie.pipe';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    GalleriePageRoutingModule
  ],
  declarations: [GalleriePage,
    StoriesComponent,
    FullscreenImageModalComponent,
    PublishPostModalComponent,
    LikesIconPipe,
    LikesIconColorPipe],
  providers: [DatePipe],
})
export class GalleriePageModule {}
