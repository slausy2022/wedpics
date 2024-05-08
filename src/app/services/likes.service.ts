import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, where, query, onSnapshot, QuerySnapshot } from 'firebase/firestore';
import { Injectable, Pipe } from '@angular/core';
import { first, map, switchMap, tap} from 'rxjs/operators';
import { Like } from '../interfaces/likes.interface';
import { Observable, combineLatest, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class LikesService {

   // Cache pour stocker les nombres de likes récupérés
  private likesCountCache: { [postId: string]: number } = {};

  constructor(
    private firestore: AngularFirestore,
    private message: MessageService
  ){}

  getLikes(postId): Observable<Like[]> {
    console.log('post : '+postId)
    return this.firestore.collection<Like>('Likes/',  ref => ref.where('postId', '==', postId))
      .valueChanges().pipe(
        map((posts: Like[]) => {
          return posts.map((post, index) => {
            return { ...post, id: posts[index].id };
          });
        })
      )
  }

  getNumberOfPostLikes(postId: string): Observable<number> {
    return this.firestore.collection<Like>('likes/', ref => ref.where('postId', '==', postId))
      .valueChanges().pipe(
        map(likes => likes.length)
      );
  }

  /*getNumberOfPostLikes(postId: string): Observable<number> {
    // Vérifie si le nombre de likes pour ce post est déjà en cache
    console.log("recherche count like du post : "+postId)
    if (this.likesCountCache[postId] !== undefined) {
      // Retourne le nombre de likes depuis le cache
      console.log("utilisation du cache : "+this.likesCountCache[postId])
      return of(this.likesCountCache[postId]);
    } else {
      // Si le nombre de likes n'est pas en cache, effectue la recherche dans Firestore
      return this.firestore.collection<Like>('likes/', ref => ref.where('postId', '==', postId))
        .valueChanges().pipe(
          first(),
          map(likes => likes.length), // Mappe les likes en nombre de likes
          tap(likesCount => {
            // Met à jour le cache avec le nombre de likes récupéré
            this.likesCountCache[postId] = likesCount;
            console.log("initialisation cache : "+this.likesCountCache[postId])
          })
        );
    }
  }*/

  getNumberOfUserLikes(email): Observable<number> {
    console.log("getNumberOfUserLikes email :" + email)
    return this.firestore.collection<Like>('likes/',  ref => ref.where('email', '==', email))
      .valueChanges().pipe(
        map( objects =>{
          return objects.length
        })
      );
  }



  async processLike(postId,email): Promise<void>{

    const dataRef = this.firestore.collection('likes/').ref

    await dataRef
      .where("postId", "==", postId)
      .where("email", "==", email)
      .get()
      .then(querySnapshot =>
        {
          if(querySnapshot.empty){

            console.log("like : "+postId+" email: "+email)
            this.firestore.collection('likes').add({
              postId: postId,
              email: email
            })
            console.log("Ajout like Ok : "+postId+" email: "+email)
            return
            //this.message.okToast("Ok on crée le like", 2000);

          }else{
            querySnapshot.forEach( object =>
              {
                console.log("unlike : "+postId+" email: "+email)
                object.ref.delete()
                console.log("suppression like Ok : "+postId+" email: "+email)
                //this.message.erreurToast("Like existe déjà", 2000);
              }
            )

            return
          }
        }
      )
  }

}
