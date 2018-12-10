import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import firebase from 'firebase';

@Component({
  selector: 'page-productList',
  templateUrl: 'productList.html'
})

export class ProductListPage {
  selectedItem: any;
  icons: string[];
  //items: Array<{ title: string, note: string, icon: string }>;
  public items: Array<any> = [];
  public itemRef: firebase.database.Reference = firebase.database().ref('/products');

 
  constructor(public navCtrl: NavController) {
  }

 	ionViewDidLoad() {
	  this.itemRef.on('value', itemSnapshot => {
	    this.items = [];
	    itemSnapshot.forEach( itemSnap => {
	      this.items.push(itemSnap.val());
	      return false;
	    });
	  });
	}
}