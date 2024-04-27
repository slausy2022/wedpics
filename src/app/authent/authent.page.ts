import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { MessageService } from './../services/message.service';


@Component({
  selector: 'app-authent',
  templateUrl: './authent.page.html',
  styleUrls: ['./authent.page.scss'],
})
export class AuthentPage {

  dataUser = {
    email: '',
    password: ''
  };

  connected: boolean;

  constructor(private auth : AuthService, private message : MessageService) {}

  async login(){
    this.connected = await this.auth.login(this.dataUser.email,this.dataUser.password)
    this.dataUser = {
      email: '',
      password: ''
    };
  }

  async signUp(){
    this.connected = await this.auth.signUp(this.dataUser.email,this.dataUser.password);
    this.dataUser = {
      email: '',
      password: ''
    };
  }

  async logout(){
    await this.auth.logout()
  }

  async resetPassword(){
    await this.auth.ResetPassword(this.dataUser.email);
  }
}
