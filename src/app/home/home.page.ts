import { getTestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ImageSelectionService } from './../services/image-selection.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from './../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Photo } from '@capacitor/camera';
import { ImagePublishService } from '../services/image-publish.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  image = 'https://www.kasterencultuur.nl/editor/placeholder.jpg';
  imageInfos: Photo;
  description = "";
  user: any;
  uploadProgress: number;
  toPublished: boolean = false;

  constructor(
    private imageSelectionService: ImageSelectionService,
    private auth : AuthService,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private toastCtrl: ToastController,
    private publishService: ImagePublishService
  ) {
    this.user = auth.getCurrentUser();
  }

  async selectImage(source: string) {

    if (source === 'camera') {
      console.log('camera');
      const cameraPhoto = await this.imageSelectionService.takePhoto();
      this.imageInfos = cameraPhoto!;
      this.image = this.imageInfos.dataUrl!;
      this.toPublished = true;
    } else {
      console.log('library');
      const libraryImage = await this.imageSelectionService.selectImageFromGallery();
      this.imageInfos = libraryImage!;
      this.image = this.imageInfos.dataUrl!;
      this.toPublished = true;
    }
  }

  async publish(){

    this.toPublished = await this.publishService.publish(this.user,this.description,this.imageInfos);

  }


}
