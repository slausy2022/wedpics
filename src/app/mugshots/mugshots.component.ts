import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Mugshots } from '../interfaces/mugshots.interface';

@Component({
  selector: 'app-mugshots',
  templateUrl: './mugshots.component.html',
  styleUrls: ['./mugshots.component.scss'],
})
export class MugshotsComponent  implements OnInit {

  images$: Observable<Mugshots[]>;

  constructor(private postService: PostService) { }

  ngOnInit() {

    this.images$ = this.postService.getAllMugshots()

  }

}
