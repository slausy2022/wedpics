import { Component, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { write } from 'fs';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-usergallerie',
  templateUrl: 'usergallerie.page.html',
  styleUrls: ['usergallerie.page.scss']
})
export class UserGalleriePage implements OnDestroy {

  images: any[] =[];
  firestoreSubscription: Subscription | undefined;
  user: any;

  constructor(
    public firestore: AngularFirestore,
    public storage: AngularFireStorage,
    public auth: AuthService
  ) {
      this.user = auth.getCurrentUser();
      this.getImagesDatabase();
  }

  getImagesDatabase() {
    this.firestore.collection('Images/').snapshotChanges(['added','removed','modified'])
    .subscribe(images => {
      if(images.length > 0){
      this.images = []
      }
      images.forEach(image => {
        console.log("imagestorage")
        this.getImagesStorage(image);
      })
    });
  }

  //recharge le tableau Images avec la la base storage
  getImagesStorage(image: any) {
    const imgRef = image.payload.doc.get("storageid");
    console.log(imgRef)
    this.storage.ref(imgRef).getDownloadURL()
    .subscribe(imgUrl => {
      console.log(imgUrl)
      console.log(this.user)
      console.log(image.payload.doc.get("email"))
      if(this.user === image.payload.doc.get("email")){
        this.images.push({
          url: imgUrl,
          description : image.payload.doc.get("description"),
          email: image.payload.doc.get("email"),
          date : image.payload.doc.get("date"),
        });
      }
    });
  }

  ngOnDestroy() {
    // Désabonne-toi lorsque le composant est détruit pour éviter les fuites de mémoire
    if(this.firestoreSubscription) {
      this.firestoreSubscription.unsubscribe();
    }
  }

}
