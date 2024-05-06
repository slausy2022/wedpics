import { Component, OnInit } from '@angular/core'
import { ModalController, PopoverController } from '@ionic/angular'
import { GalleriePage } from '../gallerie/gallerie.page';
import { ImageSelectionService } from '../services/image-selection.service';
import { AuthService } from '../services/auth.service';
import { Photo } from '@capacitor/camera';
import { PublishAvatarModalComponent } from '../publish-avatar-modal/publish-avatar-modal.component';

@Component({
  selector: 'app-avatarpop',
  templateUrl: './avatarpop.component.html',
  styleUrls: ['./avatarpop.component.scss'],
})
export class AvatarpopComponent {

 private imageInfos;

  constructor(
    private popoverController: PopoverController,
    private imageSelectionService: ImageSelectionService,
    private auth: AuthService,
    private modalController: ModalController,
  ) { }

  ClosePopover() {
    this.popoverController.dismiss();
  }

  async selectImage(source: string){
    if (source === 'camera') {
      console.log('camera');
      await this.imageSelectionService.takePhoto().then( cameraPhoto =>
        {
          this.imageInfos = cameraPhoto!;
          this.openAvatarImage(this.imageInfos, this.auth.getCurrentUser())

        }
      );

    } else {
      console.log('library');
      await this.imageSelectionService.selectImageFromGallery().then( libraryImage =>
        {
          this.imageInfos = libraryImage!;
          this.openAvatarImage(this.imageInfos, this.auth.getCurrentUser())
        }
      );
    }
  }

  async openAvatarImage(imageInfos: Photo, user: string ) {
    const modal = await this.modalController.create({
      component: PublishAvatarModalComponent,
      componentProps: {
        user : user,
        imageInfos: imageInfos
      },
    });
    console.log("ouverture de l'avatarPopComponent")
    return await modal.present();

  }
}
