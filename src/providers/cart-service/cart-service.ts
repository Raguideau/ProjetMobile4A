import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CartServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
  */
  @Injectable()
  export class CartServiceProvider {

  	cartItems : FirebaseListObservable<any>;
  	cartAmount : number  = 0;


  	constructor(public db: AngularFireDatabase,
  		private sharedService: SharedService
  		) {
  		console.log('Hello CartServiceProvider Provider');
  	}

  }
