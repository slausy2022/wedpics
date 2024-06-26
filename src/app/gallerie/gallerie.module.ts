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
import { IonicEmojiKeyboardComponent, IonicEmojiKeyboardModule } from 'ionic-emoji-keyboard';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MugshotsComponent  } from '../mugshots/mugshots.component'
import { QuillEditorComponent, QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    GalleriePageRoutingModule,
    IonicEmojiKeyboardModule,
    LazyLoadImageModule,
    QuillModule

  ],
  declarations: [GalleriePage,
    StoriesComponent,
    FullscreenImageModalComponent,
    PublishPostModalComponent,
    LikesIconPipe,
    MugshotsComponent,
    LikesIconColorPipe],
  providers: [DatePipe]
})
export class GalleriePageModule {}
