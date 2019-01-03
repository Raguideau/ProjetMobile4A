import { Component } from '@angular/core';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ProductListPage } from '../productList/productList';
import { SignupPage } from '../signup/signup';
import {
  Alert,
  AlertController,	
  Loading,
  LoadingController,
  NavController
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';

@Component({
	selector: 'page-welcome',
	templateUrl: 'welcome.html',
})


export class Welcome {

	public loginForm: FormGroup;
	public loading: Loading;

	constructor(
	  public navCtrl: NavController,
	  public loadingCtrl: LoadingController,
	  public alertCtrl: AlertController,
	  public authProvider: AuthServiceProvider,
	  formBuilder: FormBuilder
	)
	{
		this.loginForm = formBuilder.group({
	  	  email: [
	    	  '',
	    	  Validators.compose([Validators.required, EmailValidator.isValid])
	    	],
	    	password: [
	    	  '',
	    	  Validators.compose([Validators.required, Validators.minLength(6)])
	    	]
	  	  });
	}

	goToSignup():void {
	  this.navCtrl.push(SignupPage);
	}

	loginUser(): void {
  if (!this.loginForm.valid) {
    console.log(
      `Form is not valid yet, current value: ${this.loginForm.value}`
    );
  } else {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.authProvider.loginUser(email, password).then(
      authData => {
        this.loading.dismiss().then(() => {
          this.navCtrl.setRoot(ProductListPage);
        });
      },
      error => {
        this.loading.dismiss().then(() => {
          const alert: Alert = this.alertCtrl.create({
            message: error.message,
            buttons: [{ text: 'Ok', role: 'cancel' }]
          });
          alert.present();
        });
      }
    );
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }
}
}
