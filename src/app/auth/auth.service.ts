import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat";
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireAuth: AngularFireAuth,) {
  }

  private isAuth = false;
  public authSubject = new Subject<boolean>();

  emiAuthSubject() : void {
    this.authSubject.next(this.isAuth);
  }

  signIn(email: string, password: string): Promise<UserCredential> {
    return this.fireAuth.signInWithEmailAndPassword(email, password).then((userCredential: UserCredential) => {
      if (userCredential.user != null) {
        this.isAuth = true;
        this.emiAuthSubject();
        return userCredential;
      } else {
        return userCredential;
      }
    });
  }

  signOut(): Promise<void> {
    this.isAuth = false;
    this.emiAuthSubject();
    return this.fireAuth.signOut()

  }
}
