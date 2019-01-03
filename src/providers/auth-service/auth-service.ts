import { Injectable } from "@angular/core";
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

@Injectable()
export class AuthServiceProvider {

  constructor(){}

	 loginUser(email: string, password: string): Promise<any> {
	  return firebase.auth().signInWithEmailAndPassword(email, password);
	}

	signupUser(email: string, password: string): Promise<any> {
	  return firebase
	    .auth()
	    .createUserWithEmailAndPassword(email, password)
	    .then(newUserCredential => {
	      firebase
	        .database()
	        .ref(`/userProfile/${newUserCredential.user.uid}/email`)
	        .set(email);
	    })
	    .catch(error => {
	      console.error(error);
	      throw new Error(error);
	    });
	}

	logoutUser():Promise<void> {
	  const userId: string = firebase.auth().currentUser.uid;
	  firebase
	    .database()
	    .ref(`/userProfile/${userId}`)
	    .off();
	  return firebase.auth().signOut();
	}
}

