import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'

export const firebaseConfig = {
    apiKey: "AIzaSyAGXu3ywY7UaUrzuwVsgEqMPzDBFnuc-mE",
    authDomain: "wedpic-e01ad.firebaseapp.com",
    projectId: "wedpic-e01ad",
    storageBucket: "wedpic-e01ad.appspot.com",
    messagingSenderId: "610917643067",
    appId: "1:610917643067:web:9ddfc3bcf91fa167cbfd1e",
    measurementId: "G-2Y5G69TZXT"
  };

@NgModule({
  declarations: [	AppComponent
   ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule

  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
