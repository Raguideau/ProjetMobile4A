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
	public itemRef: firebase.database.Reference = firebase.database().ref('/products');

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

	testAvailability(quantityInCart: number, itemInStock: any){
		console.log(itemInStock.stock)
		if(itemInStock.stock > quantityInCart){
			return 1;
		}
		else{

			return 0;
		}
	}

	addItem(item: any ){
		this.itemExist=0;
		this.itemName=item.name;
		this.cartRef.once('value')
		.then( cartSnapshot => {
			cartSnapshot.forEach(catrsnap => {
				if(catrsnap.child("item").child("name").val() == this.itemName){
					console.log(catrsnap.child("item").child("quantity").val());
					if(this.testAvailability(catrsnap.child("item").child("quantity").val() , item)){
						catrsnap.child("item").ref.update(
							{ quantity: catrsnap.child("item").child("quantity").val() + 1 }
							);
						//console.log("item + 1");
					}
					this.itemExist=1;
				}

			})
			if(this.itemExist == 0){
				if(this.testAvailability(1, item)){
					item.quantity=1;
					this.cartRef.push( { item }  );
				}
				//console.log("item ajouté");
			}
			else{
				this.itemExist = 0;
			}

		})


	}


	getCartList(): any[] {
		return this.cartItems;
	}


	removeItem(item: any ){
		let itemName: string = item.name;
		this.cartRef.once('value')
		.then( cartSnapshot => {
			cartSnapshot.forEach(catrsnap => {
				if(catrsnap.child("item").child("name").val() == itemName){
					catrsnap.child("item").ref.remove();
					console.log(`${item} deleted`)
				}
			})
		})
	}


	placeOrder(){
		this.itemRef.once('value')
		.then( cartSnapshot => {
			let matchingItem;
			let stockLeft: number;
			cartSnapshot.forEach(catrsnap => {
				matchingItem = this.cartItems.find( item => item.item.name == catrsnap.child("name").val())
				if (matchingItem != undefined){
					stockLeft = catrsnap.child("stock").val() - matchingItem.item.quantity
					catrsnap.ref.update( { stock: stockLeft } )
					//console.log(matchingItem);
					this.cartRef.remove();
				}
				
			})
		})
	}
}
