import { Injectable } from '@angular/core';
import { User } from '../interfaces/users.interface';
import { AngularFirestore  } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { collectionGroup, query, where, getDocs } from "firebase/firestore";
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { equal } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
  ) {

   }

  getUsers(pseudo): Observable<User[]> {
    return this.firestore.collection<User>('users/', ref => ref.where('pseudo', '==', pseudo))
      .valueChanges().pipe(
        switchMap( objects => {
          const userWithUrls$ = objects.map(object => {
            return this.getUrl(object.avatar_id).pipe(
              map(url => ({ ...object, url: url }))
            );
          });
        return combineLatest(userWithUrls$);
      })
  )}

  getUsersByMail(email): Observable<User[]> {
    return this.firestore.collection<User>('users/', ref => ref.where('email', '==', email))
      .valueChanges().pipe(
        switchMap( objects => {
          const userWithUrls$ = objects.map(object => {
            return this.getUrl(object.avatar_id).pipe(
              map(url => ({ ...object, url: url }))
            );
          });
        return combineLatest(userWithUrls$);
      })
  )}

  getAllUsers(): Observable<User[]> {
    return this.firestore.collection<User>('users/')
      .valueChanges().pipe(
        switchMap( objects => {
          const userWithUrls$ = objects.map(object => {
            return this.getUrl(object.avatar_id).pipe(
              map(url => ({ ...object, url: url }))
            );
          });
        return combineLatest(userWithUrls$);
      })
  )}

  getUrl(imgId: string): Observable<string>{

      return this.storage.ref(imgId).getDownloadURL()
  }

}
