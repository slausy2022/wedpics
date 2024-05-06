import { AvatarsService } from './../services/avatars.service';
import { Component, OnInit } from '@angular/core';
import { Photo } from '@capacitor/camera';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-publish-avatar-modal',
  templateUrl: './publish-avatar-modal.component.html',
  styleUrls: ['./publish-avatar-modal.component.scss'],
})

export class PublishAvatarModalComponent implements OnInit {

  user: string;
  imageInfos: Photo;
  toPublished: boolean = true;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private avatarsService: AvatarsService
  ) { }

  ngOnInit(){
    this.user = this.navParams.get('user');
    this.imageInfos = this.navParams.get('imageInfos');
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async publish(){
    console.log("publication");
    await this.avatarsService.publish(this.user, this.imageInfos)
    this.closeModal()
  }

}
