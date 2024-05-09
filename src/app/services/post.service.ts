import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { Post, PostWithoutId } from '../interfaces/posts.interface';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, combineLatest, forkJoin, from } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { LikesService } from './likes.service';
import { MessageService } from './message.service';
import { Mugshots } from '../interfaces/mugshots.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private message: MessageService,
    private userService: UserService,
    private likesService: LikesService) { }

  getAllPosts(): Observable<Post[]>{

    console.log("getAllPosts")

    return this.firestore.collection<PostWithoutId>('Images/',  ref => ref.orderBy('date', 'desc'))
    .snapshotChanges().pipe(
      switchMap(actions => {
      const postWithUrls$ = actions.map(action => {
        const data = action.payload.doc.data() as PostWithoutId;
        const id = action.payload.doc.id;
        const pseudoPromise = this.userService.getUserPseudoByMail(data.email)
        const nbLikes = this.likesService.getNumberOfPostLikes(id)
        return this.getUrl(data.storageid).pipe(
          mergeMap(url => {
            return pseudoPromise.then(pseudo => ({ ...data, url, id, nbLikes, pseudo }) )
          })
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
          const pseudoPromise = this.userService.getUserPseudoByMail(data.email)
          const nbLikes = this.likesService.getNumberOfPostLikes(id)
          return this.getUrl(data.storageid).pipe(
              mergeMap(url => {
                return pseudoPromise.then(pseudo => ({ ...data, url, id, nbLikes, pseudo }) )
              })
            );
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
        const pseudoPromise = this.userService.getUserPseudoByMail(data.email)
        const nbLikes$ = this.likesService.getNumberOfPostLikes(id); // Obtenir l'observable pour nbLikes
          return from(pseudoPromise).pipe(
            map(pseudo => ({
              ...data,
              id,
              nbLikes: nbLikes$,
              pseudo,
              url: data.storageid // Assurez-vous d'utiliser la bonne propriété pour l'URL
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

  getAllMugshots(): Observable<Mugshots[]>{

    console.log("getAllMugshots")
    return this.firestore.collection<Mugshots>('Mugshots').valueChanges()

  }
}
