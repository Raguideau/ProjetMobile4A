import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CartServiceProvider } from '../../providers/cart-service/cart-service';
import { CartPage } from '../cart/cart';



@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html'
})
export class ProductDetailsPage {
  selectedItem: any;

  constructor(public navCtrl: NavController,
  				 public navParams: NavParams,
  				 public cartProvider: CartServiceProvider) {
    this.selectedItem = navParams.get('item');
  }

  addToCart(item) : void {
    console.log(item.name);
    this.cartProvider.addItem(item);
  }

  goToCart():void{
    this.navCtrl.push(CartPage);
  }

}
