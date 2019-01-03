import { Injectable } from '@angular/core';
import firebase, { User } from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


@Injectable()
export class CartServiceProvider {

	public userProfile: firebase.database.Reference;
	public currentUser: User;
	public cartItems: Array<any> = [];
	public cartRef: firebase.database.Reference;

	constructor() {
		firebase.auth().onAuthStateChanged( user => {
			if (user) {
				this.cartRef = firebase
				.database()
				.ref(`/userProfile/${user.uid}/cart`);

				this.cartRef.on('value', itemSnapshot => {
					this.cartItems = [];
					itemSnapshot.forEach( itemSnap => {
						this.cartItems.push(itemSnap.val());
						return false;
					});
				});
			}
		});
	}

	addItem(item: any ):PromiseLike<any> {
		item.quantity=1;
		return this.cartRef.push( { item }  );

	}


	getCartList(): any[] {
		return this.cartItems;
	}
}
