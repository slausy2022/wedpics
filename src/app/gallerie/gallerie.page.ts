import { UserService } from './../services/user.service';
import { PostService } from './../services/post.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../interfaces/posts.interface';
import { User } from '../interfaces/users.interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { write } from 'fs';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { StoriesComponent } from '../stories/stories.component';
import { AuthService } from './../services/auth.service';
import { DatePipe } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { FullscreenImageModalComponent } from '../fullscreen-image-modal/fullscreen-image-modal.component';


@Component({
  selector: 'app-gallerie',
  templateUrl: 'gallerie.page.html',
  styleUrls: ['gallerie.page.scss']
})
export class GalleriePage implements OnInit {

  //images: any[] =[];
  images$: Observable<Post[]>;
  user$: Observable<User[]>;
  firestoreSubscription: Subscription | undefined;

  postSegment: string =  'grid';

  constructor(
    public firestore: AngularFirestore,
    public storage: AngularFireStorage,
    private auth : AuthService,
    private postService: PostService,
    private userService: UserService,
    private datePipe: DatePipe,
    private modalController: ModalController
  ) {


  }

  ngOnInit(): void {
    console.log(this.auth.getCurrentUser())
      this.user$ = this.userService.getUserByMail(this.auth.getCurrentUser())
      this.getAllPosts();

  }

  getEmailPosts(email: string){
    this.images$ = this.postService.getPosts(email);
  }

  getAllPosts(){
    this.images$ = this.postService.getAllPosts();
  }

  formatDate(date: string): string {

    if (!date) return '';

    const formattedDate = this.datePipe.transform(date, 'dd/MM/yy HH:mm');
    return formattedDate || ''; // Retourne une chaîne vide si la date est invalide
  }

  async openFullscreenImage(imageUrl: string, imageDate: string, imageDescription: string ) {
    const modal = await this.modalController.create({
      component: FullscreenImageModalComponent,
      componentProps: {
        imageUrl: imageUrl,
        imageDate : imageDate,
        imageDescription : imageDescription
      },
    });
    return await modal.present();
  }

}
