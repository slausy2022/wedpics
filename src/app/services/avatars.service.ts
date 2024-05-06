import { Photo } from '@capacitor/camera';
import { Injectable, Pipe } from '@angular/core';
import { AngularFirestore, combineChanges } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { MessageService } from './message.service';
import { Observable, catchError, combineLatest, combineLatestAll, defaultIfEmpty, distinctUntilChanged, firstValueFrom, forkJoin, from, lastValueFrom, map, merge, of, switchMap } from 'rxjs';
import { Avatar, AvatarWithoutId } from '../interfaces/avatars.interface';

@Injectable({
  providedIn: 'root'
})
export class AvatarsService {

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private message: MessageService) { }

  async publish(user: string, imageInfos: Photo): Promise<boolean | false>{

    try {
      const avatar$: Observable<Avatar[]> = this.getAvatarByMail(user);

      avatar$.subscribe({
        next: avatars => {
          console.log("Avatars émis par l'observable : ", avatars);
        },
        error: error => {
          console.error("Erreur lors de la récupération des avatars : ", error);
        },
        complete: () => {
          console.log("Fin de l'émission des avatars");
        }
      });

      console.log("avatar avant");

      const avatars = await firstValueFrom(
        avatar$.pipe(
          defaultIfEmpty([]) // Émet un tableau vide si aucun élément n'est émis
        )
      );
      console.log("Tableau d'avatars : ", avatars);

      length = avatars.length;
      console.log("Longueur du tableau d'avatars : ", length);

      if ( length > 0) {
        console.log("update Avatar");
        await this.updateAvatar(avatars[0], imageInfos);
      } else {
        console.log("create Avatar");
        await this.createAvatar(user, imageInfos);
      }

      // La mise à jour ou la création s'est déroulée avec succès
      return true;
    } catch (error) {
      console.error("Erreur lors de la publication : ", error);
      // Une erreur s'est produite
      return false;
    }

  }

  async createAvatar(user: string, imageInfos: Photo){

    try {
      const randomId = Math.random().toString(36).substring(2,8);
      const avatarId = `Avatars/${new Date().getTime()}_${randomId}`;
      const blob = await this.dataUrltoBlob(imageInfos.dataUrl)

      console.log("upload de l'avatar")
      const task: AngularFireUploadTask = this.storage.upload(avatarId, blob);

      // Attendez la fin de l'upload
      await lastValueFrom(task.snapshotChanges());

      console.log("ajout de l'avatar")
      await this.firestore.collection('Avatars').add({
        avatarId : avatarId,
        email : user
      });

      this.message.okToast("Avatar Créé", 2000);
      return true;

    } catch (err) {
      const errorMessage = err as string;
      this.message.erreurToast(errorMessage, 2000);
      return false;
    }

  }

  async updateAvatar(myAvatar: Avatar, imageInfos: Photo){
    try {

      const DocToDelete = myAvatar.avatarId;
      const AvatarToUpdate = "Avatars/"+myAvatar.id;

      // Creer le document dans le storage
      const randomId = Math.random().toString(36).substring(2,8);
      const avatarId = `Avatars/${new Date().getTime()}_${randomId}`;
      const blob = await this.dataUrltoBlob(imageInfos.dataUrl)

      console.log("upload de l'avatar")
      const task: AngularFireUploadTask = this.storage.upload(avatarId, blob);

      // Attendre la fin de l'upload
      await lastValueFrom(task.snapshotChanges());

      // Update de l'avatar avec le storage Id dans le champ avatarId
      console.log("Mise à jour de l'avatar : " + AvatarToUpdate + " => avatarId: "+ avatarId )
      await this.firestore.doc(AvatarToUpdate).update({avatarId: avatarId})

      // Delete de l'ancien document
      console.log("suppression de  l'ancien")
      await this.storage.ref(DocToDelete).delete()

      return true

    } catch (err) {

      const errorMessage = err as string;
      this.message.erreurToast(errorMessage, 2000);
      return false;

    }

  }

  getAvatarByMail(email: string): Observable<Avatar[]>{

  // Observable pour obtenir les données initiales avec get()
  console.log("email d' avatar : " + email);
  const initialData$ = from(
    this.firestore.collection<AvatarWithoutId>('Avatars/', (ref) => ref.where('email', '==', email))
      .get()
    ).pipe(
      catchError((error) => {
        console.error("Error fetching initial avatar data:", error);
        return of([]); // Renvoie un observable contenant un tableau vide en cas d'erreur
      }),
    map(querySnapshot => {
      if (querySnapshot) {
        const avatars: Avatar[] = [];
        querySnapshot.forEach(doc => {
          const avatarId = doc.id;
          const data = doc.data() as AvatarWithoutId;
          avatars.push({ id: avatarId, ...data });
        });
        console.log("longueur avatar : " + avatars.length);
        return avatars;
      }else{
        return [];
      }
    })
  );

  // Observable pour surveiller les changements futurs avec snapshotChanges()
  const changes$ = this.firestore.collection<AvatarWithoutId>('Avatars/', ref => ref.where('email', '==', email)).snapshotChanges().pipe(
    map(actions => {
      // Convertit les actions en un tableau de documents
      return actions.map(action => {
        const avatarId = action.payload.doc.id;
        const data = action.payload.doc.data() as AvatarWithoutId;
        return { id: avatarId, ...data };
      });
    })
  );

  // Combine les deux observables pour émettre à la fois les données initiales et les changements futurs
  return merge(initialData$, changes$).pipe(
    map(avatars => avatars.reduce<Avatar[]>((acc, curr) => {
      if (!acc.find(avatar => avatar.id === curr.id)) {
        acc.push(curr);
      }
      return acc;
    }, [])),
    distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr))
  );
  }


  //renvoie l'Url de l'image du storage de l'avatar
  getAvatarUrl(email: string): Observable<string>{

    console.log("getAvatarUrl() : "+ email)
    return this.getAvatarByMail(email).pipe(
      switchMap((avatar: Avatar[]) => {
        // Vérifie si aucun avatar n'est trouvé
        if (avatar.length === 0) {
          return of("../../assets/images/defaut-avatar.jpeg"); // Retourne un observable contenant `undefined`
        }

        // Si un avatar est trouvé, récupère l'URL de téléchargement
        const avatarId = avatar[0].avatarId; // Supposons que l'ID de l'avatar est stocké dans une propriété `id`
        return this.storage.ref(avatarId).getDownloadURL();
      })
    );
  }

  async dataUrltoBlob(dataurl: any){
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type:mime})
  }
}
