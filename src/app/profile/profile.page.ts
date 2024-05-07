import { DeleteImageModalComponent } from './../delete-image-modal/delete-image-modal.component';
import { AvatarsService } from './../services/avatars.service';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UserService} from './../services/user.service';
import { User } from '../interfaces/users.interface';
import { PostService} from './../services/post.service';
import { LikesService} from './../services/likes.service';
import { Post } from '../interfaces/posts.interface';
import { AuthService } from './../services/auth.service';
import { ModalController, PopoverController } from '@ionic/angular';
import { AvatarpopComponent } from "../avatarpop/avatarpop.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  currentUser: string;
  user$: Observable<User[]>;
  avatarUrl$: Observable<string> | undefined;
  images$: Observable<Post[]>;
  numberOfPosts$: Observable<number>;
  numberOfLikes$: Observable<number>;
  profileSegment: string = 'usrgrid';
  buttonDisabled: boolean = true;

  firestoreSubscription: Subscription | undefined;

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private postService: PostService,
    private likesService: LikesService,
    private popoverController: PopoverController,
    private modalController: ModalController,
    private avatarsService: AvatarsService
  ) { }

  ngOnInit() {
    this.currentUser =this.auth.getCurrentUser();
    this.user$ = this.userService.getUserByMail(this.currentUser)

    this.avatarUrl$ = this.avatarsService.getAvatarUrl(this.currentUser)

    this.numberOfPosts$ = this.postService.getNumberOfPosts(this.currentUser)
    this.numberOfLikes$ = this.likesService.getNumberOfUserLikes(this.currentUser)
    console.log(this.currentUser)
    this.getEmailPosts(this.currentUser);
  }

  getEmailPosts(email: string){
    this.images$ = this.postService.getPosts(email);
  }

  handleImageError(event: any) {
    console.error('Erreur de chargement de l\'image:', event);
  }

  enableButton(){
    this.buttonDisabled = false;
  }

  async CreatePopover(ev: any) {
    const pop = await this.popoverController.create({
    component: AvatarpopComponent,
    cssClass: 'my-custom-class',
    event: ev,
    translucent: true,
    componentProps: {
    "user": this.auth.getCurrentUser(),
    }
    });
    return await pop.present();
  }

  async openModalDeletePost(post: Post ) {
    const modal = await this.modalController.create({
      component: DeleteImageModalComponent,
      componentProps: {
        post : post
      },
    });
    console.log("ouverture de la fenetre de suppression")
    return await modal.present();

  }

  validate(){
    //enregistrer l'objet dans la base ( user service update avec le user actuel )
  }

  cancel(){
    this.user$ = this.userService.getUserByMail(this.currentUser);
    this.buttonDisabled = true;

  }
}
