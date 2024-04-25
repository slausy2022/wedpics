import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';

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

  constructor(private auth : AuthService) {}

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
}
