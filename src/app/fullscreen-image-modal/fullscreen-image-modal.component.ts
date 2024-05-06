import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { AuthService } from './../services/auth.service';
import { LikesService } from './../services/likes.service';
import { Post } from '../interfaces/posts.interface';
import { LikesIconPipe,LikesIconColorPipe } from '../gallerie/gallerie.pipe';

@Component({
  selector: 'app-fullscreen-image-modal',
  templateUrl: './fullscreen-image-modal.component.html',
  styleUrls: ['./fullscreen-image-modal.component.scss'],
})
export class FullscreenImageModalComponent implements OnInit {
  imageUrl: string;
  imageDescription : string;
  imageDate: string;
  image: Post;

  constructor(private navParams: NavParams,
    private modalController: ModalController,
    private auth: AuthService,
    private likesService: LikesService
  ) {}

  ngOnInit() {
    //this.imageUrl = this.navParams.get('imageUrl');
    //this.imageDescription = this.navParams.get('imageDescription');
    this.imageDate = this.navParams.get('imageDate');
    this.image = this.navParams.get('image');

  }

  closeModal() {
    this.modalController.dismiss();
  }

  async processLike(postId: string){
    let myUser: string = this.auth.getCurrentUser();
    this.likesService.processLike(postId,myUser)
  }
}
