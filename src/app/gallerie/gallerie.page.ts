import { PostService } from './../services/post.service';
import { Component, OnDestroy } from '@angular/core';
import { Post } from '../interfaces/posts.interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { write } from 'fs';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { StoriesComponent } from '../stories/stories.component';

@Component({
  selector: 'app-gallerie',
  templateUrl: 'gallerie.page.html',
  styleUrls: ['gallerie.page.scss']
})
export class GalleriePage {

  //images: any[] =[];
  images$: Observable<Post[]>;
  firestoreSubscription: Subscription | undefined;

  constructor(
    public firestore: AngularFirestore,
    public storage: AngularFireStorage,
    private postService: PostService
  ) {
      this.getAllPosts();
  }

  getEmailPosts(email: string){
    this.images$ = this.postService.getPosts(email);
  }

  getAllPosts(){
    this.images$ = this.postService.getAllPosts();
  }


}
