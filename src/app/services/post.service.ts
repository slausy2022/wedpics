import { Injectable } from '@angular/core';
import { Post, PostWithoutId } from '../interfaces/posts.interface';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { LikesService } from './likes.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private likesService: LikesService) { }

getAllPosts(): Observable<Post[]>{

  console.log("getAllPosts")

  return this.firestore.collection<PostWithoutId>('Images/',  ref => ref.orderBy('date', 'desc'))
  .snapshotChanges().pipe(
    switchMap(actions => {
    const postWithUrls$ = actions.map(action => {
      const data = action.payload.doc.data() as PostWithoutId;
      const id = action.payload.doc.id;
      const nbLikes = this.likesService.getNumberOfPostLikes(id)
      return this.getUrl(data.storageid).pipe(
        map(url => ({ ...data, url, id, nbLikes }))
      );
    });
    return combineLatest(postWithUrls$);
  })
)}

getPosts(email): Observable<Post[]>{

  console.log('getPosts email : '+email)

  return this.firestore.collection<PostWithoutId>('Images/',  ref => ref.where('email', '==', email).orderBy('date', 'desc'))
  .snapshotChanges().pipe(
    switchMap(actions => {
      const postWithUrls$ = actions.map(action => {
        const data = action.payload.doc.data() as PostWithoutId;
        const id = action.payload.doc.id;
        const nbLikes = this.likesService.getNumberOfPostLikes(id)
        return this.getUrl(data.storageid).pipe(
         map(url => ({ ...data, url, id, nbLikes }))
        )
      });
      return combineLatest(postWithUrls$)
    })
  )
}

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
