import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/users.interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, combineLatest, forkJoin } from 'rxjs';
import { UserService } from '../services/user.service';
import { map, mergeMap } from 'rxjs/operators';
import { GalleriePage } from '../gallerie/gallerie.page';
import { AvatarsService } from '../services/avatars.service';

interface StoryWithAvatarUrl {
  story: User; // Supposons que `Story` est l'interface pour les données d'une histoire
  avatarUrl: string; // URL de l'avatar
}

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss'],
})

export class StoriesComponent implements OnInit {

  stories$: Observable<User[]>
  storiesWithAvatarUrl$: Observable<any>;


  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private userService: UserService,
    private avatarService: AvatarsService,
    private gallerie: GalleriePage
  ) {



    //this.stories.subscribe(modifiedObjects => {})

  }

  ngOnInit() {
    this.stories$ = this.userService.getAllUsers()
    this.stories$.subscribe(users => console.log('Users:', users));
    this.storiesWithAvatarUrl$ = this.getStoriesWithAvatarUrls(this.stories$);
    this.storiesWithAvatarUrl$.subscribe(data => console.log('Stories with avatar URL:', data));

  }

  /*getStoriesWithAvatarUrls(stories$: Observable<User[]>): Observable<StoryWithAvatarUrl[]> {
    return stories$.pipe(
      mergeMap(stories => {
        // Crée un tableau d'observables pour chaque histoire avec son URL d'avatar
        const avatarUrlObservables = stories.map(story => {
          return this.getAvatarUrl(story.email).pipe(
            map(avatarUrl => ({ story, avatarUrl })) // Associe l'histoire avec son URL d'avatar
          );
        });

        // Combine tous les observables en un seul observable qui émet un tableau d'objets StoryWithAvatarUrl
        return forkJoin(avatarUrlObservables);
      })
    );
  }*/
  getStoriesWithAvatarUrls(stories$: Observable<User[]>): Observable<StoryWithAvatarUrl[]> {
    return stories$.pipe(
      mergeMap(stories => {
        // Crée un tableau d'observables pour chaque histoire avec son URL d'avatar
        const avatarUrlObservables = stories.map(story => {
          return this.getAvatarUrl(story.email).pipe(
            map(avatarUrl => ({ story, avatarUrl })) // Associe l'histoire avec son URL d'avatar
          );
        });

        // Combine tous les observables en un seul observable qui émet un tableau d'objets StoryWithAvatarUrl
        return combineLatest(avatarUrlObservables);
      })
    );
  }


  getAvatarUrls(): Observable<string[]> {
    return this.stories$.pipe(
      mergeMap(stories => {
        const avatarUrlObservables = stories.map(story => this.avatarService.getAvatarUrl(story.email));
        return forkJoin(avatarUrlObservables);
      })
  )}

  afficheUserGallerie(email: string){
    console.log("afficherUserGallerie email:"+email)
    this.gallerie.getEmailPosts(email);
  }

  afficheAllGalleries(){
    this.gallerie.getAllPosts();
  }

  getAvatarUrl(email: string): Observable<string>{
    return this.avatarService.getAvatarUrl(email)
  }

}
