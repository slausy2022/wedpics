import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  heartEmptyIcon = "trail-sign-outline"
  contactIcon = "person-circle-outline"
  isIos = false

  constructor(private platform: Platform) {
    console.log("platforms : "+this.platform.platforms())
    if ( this.platform.is('ipad') || this.platform.is("iphone") || this.platform.is("ios") ) {

      this.isIos = true
    }
    console.log("Ios: "+this.isIos)
    if(this.isIos){
      this.heartEmptyIcon = "trail-sign-outline"
      this.contactIcon = "person-circle-outline"
    }
  }
}
