import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Post } from '../interfaces/posts.interface';
import { PostService } from '../services/post.service';
import { Emoji } from 'ionic-emoji-keyboard';

@Component({
  selector: 'app-delete-image-modal',
  templateUrl: './delete-image-modal.component.html',
  styleUrls: ['./delete-image-modal.component.scss'],
})
export class DeleteImageModalComponent  implements OnInit {

  post: Post;
  toPublished: boolean = true;
  showEmojiKeyboard = true;

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

  async update(post: Post){
    console.log("Mise à jour");
    await this.postsService.updatePostDescription(post)
    this.closeModal()
  }
  onEmojiSelected(event: Emoji)  {
    this.post.description += event.emoji;
  };

  onShowEmojiKeyboard()  {
    if(this.showEmojiKeyboard){
      this.showEmojiKeyboard = false;
    }else{
      this.showEmojiKeyboard = true;
    }

  };

}



