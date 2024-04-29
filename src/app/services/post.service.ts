import { Injectable } from '@angular/core';
import { Post } from '../interfaces/posts.interface';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, combineLatest } from 'rxjs';
import { AngularFireList } from '@angular/fire/compat/database';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage) { }


getAllPosts(): Observable<Post[]> {
  return this.firestore.collection<Post>('Images/', ref => ref.orderBy('date', 'desc'))
    .valueChanges().pipe(
      switchMap( objects => {
        const postWithUrls$ = objects.map(object => {
          return this.getUrl(object.storageid).pipe(
            map(url => ({ ...object, url: url }))
          );
        });
      return combineLatest(postWithUrls$);
    })
)}

getPosts(email): Observable<Post[]> {
  return this.firestore.collection<Post>('Images/',  ref => ref.where('email', '==', email).orderBy('date', 'desc'))
    .valueChanges().pipe(
      switchMap( objects => {
        const postWithUrls$ = objects.map(object => {
          return this.getUrl(object.storageid).pipe(
            map(url => ({ ...object, url: url }))
          );
        });
      return combineLatest(postWithUrls$);
    })
)}

getNumberOfPosts(email): Observable<number> {

  return this.firestore.collection<Post>('Images/',  ref => ref.where('email', '==', email))
    .valueChanges().pipe(
      map( objects =>{
        return objects.length
      })
    );

}

getUrl(imgId: string): Observable<string>{

  return this.storage.ref(imgId).getDownloadURL()
}

}
