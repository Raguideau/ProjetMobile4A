import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CartServiceProvider } from '../../providers/cart-service/cart-service';
import firebase from 'firebase';


@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})

export class CartPage {
 
  public cartList: any[];

  constructor(
    public navCtrl: NavController,
    public cartProvider: CartServiceProvider
    ) {
    this.cartList = this.cartProvider.getCartList();
  }



}