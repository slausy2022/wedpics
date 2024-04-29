import { Photo } from '@capacitor/camera';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class ImagePublishService {

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private message: MessageService) { }

  async publish(user: string, description: string, imageInfos: Photo): Promise<boolean | false>{

    let toPublished = false;
    const randomId = Math.random().toString(36).substring(2,8);
    const fileId = `Images/${new Date().getTime()}_${randomId}`;
    const blob = this.dataUrltoBlob(imageInfos.dataUrl)
    .then( async blob => {
      const uploadTask = this.storage.upload(fileId, blob)
      .then( async res => {
        this.firestore.collection('Images').add({
          storageid: fileId,
          description: description,
          email: user,
          date: new Date().toISOString()
        })
        .then( res => {
          this.message.okToast("Image publiée",2000);
          toPublished = true
        })
        .catch(err =>  {
          this.message.erreurToast(err.code,2000)
          toPublished = false
        });
      })
    })

    return toPublished;
  }

  async dataUrltoBlob(dataurl: any){
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime})
  }
}
