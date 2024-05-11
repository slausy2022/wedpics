import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, PopoverController } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { AvatarpopComponent } from '../avatarpop/avatarpop.component';
import { PublishAvatarModalComponent } from '../publish-avatar-modal/publish-avatar-modal.component';
import { DeleteImageModalComponent } from '../delete-image-modal/delete-image-modal.component';
import { IonicEmojiKeyboardModule } from 'ionic-emoji-keyboard';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    IonicEmojiKeyboardModule,
    QuillModule
  ],
  declarations: [ProfilePage, AvatarpopComponent, PublishAvatarModalComponent, DeleteImageModalComponent],
  providers: [AvatarpopComponent],
})
export class ProfilePageModule {}
