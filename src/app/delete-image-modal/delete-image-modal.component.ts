import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AvatarsService } from '../services/avatars.service';
import { Photo } from '@capacitor/camera';
import { Post } from '../interfaces/posts.interface';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-delete-image-modal',
  templateUrl: './delete-image-modal.component.html',
  styleUrls: ['./delete-image-modal.component.scss'],
})
export class DeleteImageModalComponent  implements OnInit {

  post: Post;
  imageInfos: Photo;
  toPublished: boolean = true;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController,
    private postsService: PostService
  ) { }

  ngOnInit(){
    this.post = this.navParams.get('post');
  }

  closeModal() {
    this.modalController.dismiss();
  }

  async delete(post: Post){
    console.log("Suppression");
    await this.postsService.delete(post)
    this.closeModal()
  }

}



