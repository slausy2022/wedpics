import { Photo } from '@capacitor/camera';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { MessageService } from './message.service';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagePublishService {

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private message: MessageService) { }

  async publish(user: string, description: string, imageInfos: Photo): Promise<boolean | false>{

    try {
      const randomId = Math.random().toString(36).substring(2,8);
      const fileId = `Images/${new Date().getTime()}_${randomId}`;
      const blob = await this.dataUrltoBlob(imageInfos.dataUrl)
      if(description === undefined) description = "";

      const task: AngularFireUploadTask = this.storage.upload(fileId, blob);

      // Attendez la fin de l'upload
      await lastValueFrom(task.snapshotChanges());

      await this.firestore.collection('Images').add({
        storageid: fileId,
        description: description,
        email: user,
        date: new Date().toISOString()
      });

      this.message.okToast("Image publiée", 2000);
      return true;
    } catch (err) {
      const errorMessage = err as string;
      this.message.erreurToast(errorMessage, 2000);
      return false;
    }
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
