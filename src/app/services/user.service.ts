import { Injectable, OnInit } from '@angular/core';
import { User } from '../interfaces/users.interface';
import { AngularFirestore  } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { collectionGroup, query, where, getDocs } from "firebase/firestore";
import { Observable, combineLatest, forkJoin, of } from 'rxjs';
import { map, switchMap, take , first} from 'rxjs/operators';
import { equal } from 'assert';
import { AvatarsService } from './avatars.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private avatarService: AvatarsService,
    private messageService: MessageService
  ) {

   }

  getUsers(pseudo): Observable<User[]> {
    return this.firestore.collection<User>('users/', ref => ref.where('pseudo', '==', pseudo))
    .valueChanges()
  }

  getUsersByMail(email): Observable<User[]>{
    return this.firestore.collection<User>('users/', ref => ref.where('email', '==', email))
        .valueChanges()
  }

  async getUserObjByMail(email): Promise<User | undefined> {

    let myUser: User | undefined
    const snapshot = await this.firestore.collection<User>('users').ref.where('email', '==', email).limit(1).get()
    snapshot.forEach(user => {
      myUser = user.data()
    })

    return myUser

  }

  getUserByMail(email): Observable<User[]>{
    return this.firestore.collection<User>('users/', ref => ref.where('email', '==', email))
    .valueChanges().pipe(
      first()
    )
  }

  getAllUsers(): Observable<User[]> {

    return this.firestore.collection<User>('users/', ref => ref)
    .valueChanges()
  }

  getUrl(user: string): Observable<string> {

      return this.avatarService.getAvatarUrl(user)!
  }

  async updateUser(user: User): Promise<void>{

    const email = user.email;
    const  valuesToUpdate = {
      description: user.description,
      pseudo: user.pseudo,
      nom: user.nom,
      prenom: user.prenom
    }
    try {

      const snapshot = await this.firestore.collection('users').ref.where('email', '==', email).limit(1).get();
      if (snapshot.empty) {
        this.messageService.erreurToast("Utilisateur on trouvé : "+email, 2000)
        return; // Aucun objet trouvé avec cet email
      }
      // Parcourir les résultats pour récupérer l'ID du premier objet
      let id: string | null = null;
      snapshot.forEach(doc => {

        const userId = doc.ref.id
        console.log("userid : "+userId)
        console.log("values : "+valuesToUpdate.description)
        this.firestore.collection('users').doc(userId).update(valuesToUpdate)
      })
      this.messageService.okToast("Utilisateur mis à jour", 2000)
      return


    } catch (error) {
      console.error("Erreur lors de la récupération de l'ID:", error);
      this.messageService.erreurToast("Erreur lors de la récupération de l'ID :"+ error, 2000)
      return
    }


  }


}
