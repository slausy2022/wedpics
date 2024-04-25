import { PasswordResetRequest } from './../../../node_modules/@firebase/auth/dist/esm5/src/api/authentication/email_and_password.d';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  connected: boolean;
  userId: string;
  mail: any;
  method: any;

  constructor(private afAuth: AngularFireAuth, private router: Router){

    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
        console.log('non connecté');
        this.connected = false;
      } else {
        console.log('connecté: ' + auth.uid);
        this.connected = true;
        this.userId = auth.uid;
        this.mail = auth.email;
        this.method = auth.providerData[0]!.providerId;
      }
  });}

  async login(email:string, password:string) : Promise<boolean | false>{
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      this.router.navigate(['tabs']);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
      // Gérer les erreurs de connexion ici
    }
  }

  async signUp(email:string, password:string) : Promise<boolean | false>{
    try{
      await this.afAuth.createUserWithEmailAndPassword(email,password);
      this.router.navigate(['tabs']);
      return true;

    } catch (error) {
      console.error('Login error:', error);
      return false;
      // Gérer les erreurs de connexion ici
    }
  }

  async logout(){
    try {
      await this.afAuth.signOut();
      this.router.navigate(['login']);
    } catch (error) {
      console.error('Logout error:', error);
      this.router.navigate(['/login']);
      // Gérer les erreurs de déconnexion ici
    }
  }

  status(){
    return this.connected;
  }

  getCurrentUser(){
    return this.mail;
  }
}
