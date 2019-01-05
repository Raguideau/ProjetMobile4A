import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CartServiceProvider } from '../../providers/cart-service/cart-service';
import { CartPage } from '../cart/cart';
import { ToastController } from 'ionic-angular';



@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html'
})
export class ProductDetailsPage {
  selectedItem: any;

  constructor(public navCtrl: NavController,
    			private toastCtrl: ToastController,
  				 public navParams: NavParams,
  				 public cartProvider: CartServiceProvider) {
    this.selectedItem = navParams.get('item');
  }

  addToCart(item) : void {
    //console.log(item.name);
    this.cartProvider.addItem(item);
    let toast = this.toastCtrl.create({
      message: 'Le produit a été ajouté au panier',
      duration: 3000,
      position: 'bottom'
    });
    
    toast.present();
  }

  goToCart():void{
    this.navCtrl.push(CartPage);
  }

}
