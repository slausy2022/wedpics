import { UserService } from './../services/user.service';
import { PostService } from './../services/post.service';
import { LikesService } from './../services/likes.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../interfaces/posts.interface';
import { User } from '../interfaces/users.interface';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable, lastValueFrom} from 'rxjs';
import { Subscription, of } from 'rxjs';
import { Photo } from '@capacitor/camera';
import { AuthService } from './../services/auth.service';
import { DatePipe } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { FullscreenImageModalComponent } from '../fullscreen-image-modal/fullscreen-image-modal.component';
import { PublishPostModalComponent } from '../publish-post-modal/publish-post-modal.component';
import { ImageSelectionService } from './../services/image-selection.service';
import { LikesIconPipe,LikesIconColorPipe } from './gallerie.pipe';
import { AvatarsService } from '../services/avatars.service';


@Component({
  selector: 'app-gallerie',
  templateUrl: 'gallerie.page.html',
  styleUrls: ['gallerie.page.scss']
})

export class GalleriePage implements OnInit {

  //images: any[] =[];
  currentUser: string;
  images$: Observable<Post[]>;
  user$: Observable<User[]>;
  avatarUrl$: Observable<string>;
  firestoreSubscription: Subscription | undefined;
  private likesCountCache: { [postId: string]: number } = {};

  image = 'https://www.kasterencultuur.nl/editor/placeholder.jpg';
  imageInfos: Photo;
  user: any;
  uploadProgress: number;

  postSegment: string =  'grid';

  constructor(
    public firestore: AngularFirestore,
    public storage: AngularFireStorage,
    private auth : AuthService,
    private postService: PostService,
    private userService: UserService,
    private likesService: LikesService,
    private datePipe: DatePipe,
    private modalController: ModalController,
    private avatarService: AvatarsService,
    private imageSelectionService: ImageSelectionService

  ) {}

  ngOnInit(): void {
    console.log(this.auth.getCurrentUser())
      this.currentUser =this.auth.getCurrentUser();
      this.user$ = this.userService.getUserByMail(this.currentUser)
      this.avatarUrl$ = this.avatarService.getAvatarUrl(this.currentUser)
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

  async openFullscreenImage(myImage: Post, imageDate: string ) {
    const modal = await this.modalController.create({
      component: FullscreenImageModalComponent,
      componentProps: {
        image: myImage,
        imageDate: imageDate
      },
    });
    return await modal.present();
  }

  async selectImage(source: string) {

    if (source === 'camera') {
      console.log('camera');
      await this.imageSelectionService.takePhoto().then( cameraPhoto =>
        {
          this.imageInfos = cameraPhoto!;
          this.image = this.imageInfos.dataUrl!;
          lastValueFrom(this.user$).then((myuser: User[]) => {
            this.openPostImage(this.imageInfos, myuser[0].email)
          });
        }
      );

    } else {
      console.log('library');
      await this.imageSelectionService.selectImageFromGallery().then( libraryImage =>
        {
          this.imageInfos = libraryImage!;
          this.image = this.imageInfos.dataUrl!;
          lastValueFrom(this.user$).then((myuser: User[]) => {
            this.openPostImage(this.imageInfos, myuser[0].email)
          });

        }
      );
    }
  }

  async openPostImage(imageInfos: Photo, user: string ) {
    const modal = await this.modalController.create({
      component: PublishPostModalComponent,
      componentProps: {
        user : user,
        imageInfos: imageInfos
      },
    });
    return await modal.present();
  }

  async processLike(postId: string){
    let myUser: string = this.auth.getCurrentUser();
    this.likesService.processLike(postId,myUser)
  }
}
