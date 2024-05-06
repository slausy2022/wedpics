import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { ImagePublishService } from '../services/image-publish.service';
import { Photo } from '@capacitor/camera';

@Component({
  selector: 'app-publish-post-modal',
  templateUrl: './publish-post-modal.component.html',
  styleUrls: ['./publish-post-modal.component.scss'],
})
export class PublishPostModalComponent  implements OnInit {
  user: string;
  imageInfos: Photo;
  imageDescription : string;
  imageDate: string;
  toPublished: boolean = true;

  constructor(private navParams: NavParams,
    private modalController: ModalController,
    private publishService: ImagePublishService
  ) {}

  ngOnInit() {
    this.user = this.navParams.get('user');
    this.imageInfos = this.navParams.get('imageInfos');
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async publish(){
    this.toPublished = false
    await this.publishService.publish(this.user,this.imageDescription,this.imageInfos)
    .then(toPublished => {
      this.toPublished = toPublished
      this.closeModal()
    })
    .catch(toPublished => {this.toPublished = true});

  }
}

