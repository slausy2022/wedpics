import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { UserService} from './../services/user.service';
import { User } from '../interfaces/users.interface';
import { PostService} from './../services/post.service';
import { Post } from '../interfaces/posts.interface';
import { AuthService } from './../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  currentUser: string;
  user$: Observable<User[]>;
  numberOfPosts$: Observable<number>;

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private postService: PostService
  ) { }

  ngOnInit() {
    this.currentUser =this.auth.getCurrentUser();
    this.user$ = this.userService.getUserByMail(this.auth.getCurrentUser())
    this.numberOfPosts$ = this.postService.getNumberOfPosts(this.currentUser)
  }

}
