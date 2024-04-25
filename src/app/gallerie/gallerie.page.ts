import { Component, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { write } from 'fs';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gallerie',
  templateUrl: 'gallerie.page.html',
  styleUrls: ['gallerie.page.scss']
})
export class GalleriePage implements OnDestroy {

  images: any[] =[];
  firestoreSubscription: Subscription | undefined;

  constructor(
    public firestore: AngularFirestore,
    public storage: AngularFireStorage
  ) {
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
      this.images.push({
        url: imgUrl,
        description : image.payload.doc.get("description"),
        email: image.payload.doc.get("email"),
        date : image.payload.doc.get("date"),
      });
    });
  }

  ngOnDestroy() {
    // Désabonne-toi lorsque le composant est détruit pour éviter les fuites de mémoire
    if(this.firestoreSubscription) {
      this.firestoreSubscription.unsubscribe();
    }
  }
}
