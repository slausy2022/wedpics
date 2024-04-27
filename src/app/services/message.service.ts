import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular'

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private toastCtrl: ToastController) {}

  async erreurToast(message: string, duration: number ){

    let errorToast = await this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'middle',
      color: 'danger'
    });

    errorToast.present();
  }

  async okToast(message: string, duration: number ){

    let okToast = await this.toastCtrl.create({
      message: message,
      duration: duration,
      position: 'middle',
      color: 'success'

    });

    okToast.present();
  }


}
