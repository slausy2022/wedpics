import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { AuthService } from './../services/auth.service';
import { LikesService } from './../services/likes.service';
import { Post } from '../interfaces/posts.interface';
import { Observable } from 'rxjs';
import { GalleriePage } from '../gallerie/gallerie.page';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-fullscreen-image-modal',
  templateUrl: './fullscreen-image-modal.component.html',
  styleUrls: ['./fullscreen-image-modal.component.scss'],
})

export class FullscreenImageModalComponent implements OnInit{
  imageUrl: string;
  imageDescription : string;
  imageDate: string;
  image: Post;
  nbLikes$: Observable<number>;

  constructor(private navParams: NavParams,
    private modalController: ModalController,
    private auth: AuthService,
    private likesService: LikesService,
    private datePipe: DatePipe,
  ) {}


  ngOnInit() {
    //this.imageUrl = this.navParams.get('imageUrl');
    //this.imageDescription = this.navParams.get('imageDescription');
    this.imageDate = this.navParams.get('imageDate');
    this.image = this.navParams.get('image');
    this.nbLikes$ = this.likesService.getNumberOfPostLikes(this.image.id); // Obtenir l'observable pour nbLikes

  }

  closeModal() {
    this.modalController.dismiss();
  }

  async processLike(postId: string){
    let myUser: string = this.auth.getCurrentUser();
    await this.likesService.processLike(postId,myUser)

  }

  formatDate(date: string): string {

    if (!date) return '';

    const formattedDate = this.datePipe.transform(date, 'dd/MM/yy HH:mm');
    return formattedDate || ''; // Retourne une chaîne vide si la date est invalide
  }

}
