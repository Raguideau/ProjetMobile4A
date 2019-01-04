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
	public itemName: string;
	public itemExist: number;

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

	addItem(item: any ){
		this.itemExist=0;
		this.itemName=item.name;
		this.cartRef.once('value')
			.then( cartSnapshot => {
				cartSnapshot.forEach(catrsnap => {
					if(catrsnap.child("item").child("name").val() == this.itemName){
						catrsnap.child("item").ref.update(
							{ quantity: catrsnap.child("item").child("quantity").val() + 1 }
						);
						console.log("item trouvé")
						this.itemExist=1;
					}

				})
			if(this.itemExist == 0){
				item.quantity=1;
				this.cartRef.push( { item }  );
				console.log("item ajouté")
			}
			else{
				this.itemExist = 0;
			}

			})


	}


	getCartList(): any[] {
		return this.cartItems;
	}
}
