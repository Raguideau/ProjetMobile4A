import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
	selector: 'page-welcome',
	templateUrl: 'welcome.html',
})
export class Welcome {

	username : string; 
	password : string; 

	constructor(public navCtrl: NavController
		public authService: AuthService,
		) {
	}

	ionViewDidLoad() {
		if(this.authService.isLoggedIn()){
			this.navCtrl.setRoot(ProductListPage);
		}
	}

	login(){
		this.authService.login(this.username,this.password).then(value => {
			this.navCtrl.setRoot(ProductListPage);
		})
		.catch(err => {
			let toast = this.toastCtrl.create({
				message: "nom d'utilisateur ou mot de passe invalide!",
				duration: 3000
			});
			toast.present();		
		});
	}

	login(){
		this.navCtrl.push(Login);
	}

	signup(){
		this.navCtrl.push(Signup);
	}
}