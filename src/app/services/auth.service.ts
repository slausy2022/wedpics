import { PasswordResetRequest } from './../../../node_modules/@firebase/auth/dist/esm5/src/api/authentication/email_and_password.d';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router'
import { MessageService } from './message.service';
import { UserService } from './user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  connected: boolean;
  userId: string;
  mail: any;
  method: any;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private message: MessageService,
    private userService: UserService ){

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

    let ret: boolean = true;
    await this.afAuth.signInWithEmailAndPassword(email, password)
    .then(auth => { this.router.navigate(['tabs']);  ret = true} )
    .catch(err => { console.error('Login error:', err.message); this.message.erreurToast(err.code,2000); ret = false  })

    return ret;

  }

  async signUp(email:string, password:string) : Promise<boolean | false>{

    let ret: boolean = true;
    await this.afAuth.createUserWithEmailAndPassword(email,password)
    .then( auth => {
      this.userService.addUser(email).then( auth => {
        this.login(email,password).then( auth => {return true} );
      })
    })
    .catch(err => { console.error('Login error:', err.message); this.message.erreurToast(err.code,2000); ret = false  })

    return ret;

  }

  async logout(){
    try {
      await this.afAuth.signOut();
      this.router.navigate(['login']);
    } catch (error) {
      console.error('Logout error:', error);
      this.router.navigate(['login']);
      // Gérer les erreurs de déconnexion ici
    }
  }

  async ResetPassword(email: string){

    await this.afAuth.sendPasswordResetEmail(email)
      .then(send => {
        this.message.okToast("Si votre mail existe, un lien de réinitialisation va vous être transmis",2000)
      })
      .catch(err =>  {
        this.message.erreurToast(err.code,2000)
      });
  }

  status(){
    return this.connected;
  }

  getCurrentUser(){
    return this.mail;
  }

  codeToMessage(code: string){
    /* fonction jamais ecrite */
  }
}
