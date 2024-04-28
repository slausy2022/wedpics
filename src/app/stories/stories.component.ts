import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/users.interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { map } from 'rxjs/operators';
import { GalleriePage } from '../gallerie/gallerie.page';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss'],
})
export class StoriesComponent {

  stories$: Observable<User[]>

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private userService: UserService,
    private gallerie: GalleriePage
  ) {

    this.stories$ = this.userService.getAllUsers()

    //this.stories.subscribe(modifiedObjects => {})

  }

  afficheUserGallerie(email: string){
    this.gallerie.getEmailPosts(email);
  }

  afficheAllGalleries(){
    this.gallerie.getAllPosts();
  }

}
