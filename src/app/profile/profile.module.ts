import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule, PopoverController } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { AvatarpopComponent } from '../avatarpop/avatarpop.component';
import { PublishAvatarModalComponent } from '../publish-avatar-modal/publish-avatar-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule
  ],
  declarations: [ProfilePage, AvatarpopComponent, PublishAvatarModalComponent],
  providers: [AvatarpopComponent],
})
export class ProfilePageModule {}
