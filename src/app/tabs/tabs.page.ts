import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  heartEmptyIcon = "heart-empty"
  contactIcon = "contact"
  isAndroid = false
  constructor(private platform: Platform) {
    this.isAndroid = this.platform.is('android');
    console.log("Android: "+this.isAndroid)
    if(this.isAndroid){
      this.heartEmptyIcon = "md-heart-empty"
      this.contactIcon = "md-contact"
    }
  }
}
