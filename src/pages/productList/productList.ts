import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CartServiceProvider } from '../../providers/cart-service/cart-service';
import { CartPage } from '../cart/cart';
import { ProductDetailsPage } from '../product-details/product-details';
import firebase from 'firebase';
import { ToastController } from 'ionic-angular';


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


  constructor(
    public navCtrl: NavController,
    public cartProvider: CartServiceProvider,
    private toastCtrl: ToastController
    ) {
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

  addToCart(item) : void {
    //console.log(item.name);
    this.cartProvider.addItem(item);
    let toast = this.toastCtrl.create({
      message: 'Le produit a été ajoutée au panier',
      duration: 3000,
      position: 'bottom'
    });
    
    toast.present();
  }



  goToCart():void{
    this.navCtrl.push(CartPage);
  }

  itemTapped(event, item) {
    this.navCtrl.push(ProductDetailsPage, {
      item: item
    });
  }

}