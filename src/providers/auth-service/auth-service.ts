import {Injectable} from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from "firebase";
import { Observable } from 'rxjs/Observable';
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AuthServiceProvider Provider');
  }

}
