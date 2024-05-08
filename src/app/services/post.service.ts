import { Injectable } from '@angular/core';
import { Post, PostWithoutId } from '../interfaces/posts.interface';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, combineLatest } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { LikesService } from './likes.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private message: MessageService,
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

getPostById(id): Observable<Post>{
  return this.firestore.collection<PostWithoutId>('Images').doc(id)
  .snapshotChanges().pipe(
    switchMap(action => {
      const data = action.payload.data() as PostWithoutId;
      const id = action.payload.id;
      const nbLikes$ = this.likesService.getNumberOfPostLikes(id); // Obtenir l'observable pour nbLikes
      return this.getUrl(data.storageid).pipe(
        map(url => ({
          ...data,
          id,
          nbLikes: nbLikes$, // Utiliser l'observable pour nbLikes
          url: url
        }))
      );
    })
  );
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

async delete(post: Post): Promise<void>{

    if (post === undefined){
      this.message.erreurToast("Erreur de suppression du post :  Valeur de post non définie", 2000)
      return
    }
    if (post.id === undefined){
      this.message.erreurToast("Erreur de suppression du post :  Reference de post non définie", 2000)
      return
    }

    try{
      console.log("suppression du post : "+ post.id)
      await this.firestore.collection("Images").doc(post.id).delete()

    }catch{
      this.message.erreurToast("Erreur de suppression du post", 2000)
      return
    }

    if (post.storageid === undefined){
      this.message.erreurToast("Erreur de suppression de l'image :  l'image n'existe pas mais le post a été supprimé", 2000)
      return
    }

    try{
      console.log("suppression de l'image : "+ post.storageid)
      await this.storage.ref(post.storageid).delete()
      this.message.okToast("Post supprimé !", 2000)

    }catch{
      this.message.erreurToast("Erreur de suppression de l'image", 2000)
      return

    }

    return
}
}
