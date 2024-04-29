import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-fullscreen-image-modal',
  templateUrl: './fullscreen-image-modal.component.html',
  styleUrls: ['./fullscreen-image-modal.component.scss'],
})
export class FullscreenImageModalComponent implements OnInit {
  imageUrl: string;
  imageDescription : string;
  imageDate: string;

  constructor(private navParams: NavParams, private modalController: ModalController) {}

  ngOnInit() {
    this.imageUrl = this.navParams.get('imageUrl');
    this.imageDescription = this.navParams.get('imageDescription');
    this.imageDate = this.navParams.get('imageDate');
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
