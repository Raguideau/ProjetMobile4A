import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CartServiceProvider } from '../../providers/cart-service/cart-service';
import firebase from 'firebase';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})

export class CartPage {
 
  public cartList: any[];
  private emptyCart: boolean = true;

  constructor(
    public navCtrl: NavController,
    public cartProvider: CartServiceProvider,
    public alertCtrl: AlertController
    )
    {
      this.cartProvider.cartRef.on('value', itemSnapshot => {
        this.cartList = this.cartProvider.getCartList();
        if (this.cartList.length == 0){
          this.emptyCart=true;
        }
        else{
          this.emptyCart=false;
        }
      })
    }


  removeItems( item: any ){
    console.log(item.name);
    this.cartProvider.removeItem(item);
  }

  placeOrder(){
    const alert = this.alertCtrl.create({
      title: 'Merci de votre achat!',
      subTitle: 'Votre commande a bien été prise en compte',
      buttons: ['OK']
    });
    alert.present();

    this.cartProvider.placeOrder();
  }


}