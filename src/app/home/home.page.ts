import { getTestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { ImageSelectionService } from './../services/image-selection.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from './../services/auth.service';
import { ToastController } from '@ionic/angular';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Photo } from '@capacitor/camera';


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

  constructor(
    private imageSelectionService: ImageSelectionService,
    private auth : AuthService,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private toastCtrl: ToastController
  ) {
    this.user = auth.getCurrentUser();
  }

  async selectImage(source: string) {

    if (source === 'camera') {
      console.log('camera');
      const cameraPhoto = await this.imageSelectionService.takePhoto();
      //this.image = 'data:image/jpeg;base64,' + cameraPhoto!;
      this.imageInfos = cameraPhoto!;
      this.image = this.imageInfos.dataUrl!;
    } else {
      console.log('library');
      const libraryImage = await this.imageSelectionService.selectImageFromGallery();
      //this.image = 'data:image/jpeg;base64,' + libraryImage!;
      this.imageInfos = libraryImage!;
      this.image = this.imageInfos.dataUrl!;
    }

  }

  async publish(){

  /*    const fieContent = await Filesystem.readFile({
        path: this.image,
        directory: Directory.Documents,
        encoding: Encoding.UTF8
      })
*/


      const randomId = Math.random().toString(36).substring(2,8);
      const fileId = `Images/${new Date().getTime()}_${randomId}`;
      const blob = this.dataUrltoBlob(this.imageInfos.dataUrl )
      const uploadTask = this.storage.upload(fileId, blob);

      uploadTask.percentageChanges().subscribe(changes => {
        this.uploadProgress = changes!;
      })

      uploadTask.then(async res => {
        this.firestore.collection('Images').add({
          storageid: fileId,
          description: this.description,
          email: this.user
        });
      });

  }

  dataUrltoBlob(dataurl: any){
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime})
  }

}
