import { Injectable } from '@angular/core';
import { User } from '../interfaces/users.interface';
import { AngularFirestore  } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { collectionGroup, query, where, getDocs } from "firebase/firestore";
import { Observable, combineLatest, forkJoin, of } from 'rxjs';
import { map, switchMap, take , first} from 'rxjs/operators';
import { equal } from 'assert';
import { AvatarsService } from './avatars.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private avatarService: AvatarsService
  ) {

   }

/*  getUsers(pseudo): Observable<User[]> {
    return this.firestore.collection<User>('users/', ref => ref.where('pseudo', '==', pseudo))
      .valueChanges().pipe(
        switchMap( objects => {
          const userWithUrls$ = objects.map(object => {
            return this.getUrl(object.email).pipe(
              map(url => ({ ...object, url: url }))
            );
          });
        return combineLatest(userWithUrls$);
      })
  )}
*/
getUsers(pseudo): Observable<User[]> {
  return this.firestore.collection<User>('users/', ref => ref.where('pseudo', '==', pseudo))
  .valueChanges()
}


/*  getUsersByMail(email): Observable<User[]> {
    return this.firestore.collection<User>('users/', ref => ref.where('email', '==', email))
      .valueChanges().pipe(
        switchMap( objects => {
          const userWithUrls$ = objects.map(object => {
            return this.getUrl(object.email).pipe(
              map(url => ({ ...object, url: url }))
            );
          });
        return combineLatest(userWithUrls$);
      })
  )}
*/

getUsersByMail(email): Observable<User[]>{
  return this.firestore.collection<User>('users/', ref => ref.where('email', '==', email))
      .valueChanges()
}

  getUserByMail(email): Observable<User[]>{
    return this.firestore.collection<User>('users/', ref => ref.where('email', '==', email))
    .valueChanges().pipe(
      first()
    )
  }

/*  getAllUsers(): Observable<User[]> {
    return this.firestore.collection<User>('users/')
      .valueChanges().pipe(
        switchMap( objects => {
          const userWithUrls$ = objects.map(object => {
            return this.getUrl(object.email).pipe(
              map(url: Observable<string> => ({ ...object, url: url }))
            )
          });
        return combineLatest(userWithUrls$);
      })
  )}
*/

  getAllUsers(): Observable<User[]> {

    return this.firestore.collection<User>('users/', ref => ref)
    .valueChanges()
  }

  getUrl(user: string): Observable<string> {

      return this.avatarService.getAvatarUrl(user)!
  }


}
