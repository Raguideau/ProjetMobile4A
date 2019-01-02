import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ProductListPage } from '../pages/productList/productList';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import firebase from "firebase";
import { GetItemsListProvider } from '../providers/get-items-list/get-items-list';
import { CartServiceProvider } from '../providers/cart-service/cart-service';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';


var config = {
  apiKey: "AIzaSyCxEgITPxPfip5Fn-ZWgZnic65ldr0uLpw",
  authDomain: "gmarket-5b1f0.firebaseapp.com",
  databaseURL: "https://gmarket-5b1f0.firebaseio.com",
  projectId: "gmarket-5b1f0",
  storageBucket: "gmarket-5b1f0.appspot.com",
  messagingSenderId: "78394573435",
};
firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ProductListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ProductListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GetItemsListProvider,
    CartServiceProvider,
    AuthServiceProvider
  ]
})
export class AppModule {}
