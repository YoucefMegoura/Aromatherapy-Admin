import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {
  }

  private isAuth = false;
  public authSubject = new Subject<boolean>();

  emiAuthSubject() : void {
    this.authSubject.next(this.isAuth);
  }

  signIn(email: string, password: string): any {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email == 'superuser@email.com' && password == 'testtest') { //TODO:: remove
          this.isAuth = true;
          this.emiAuthSubject();
          resolve(true);
        } else {
          reject('Incorrect Email/password, try again');
        }
      }, 1000);
    });
  }

  signOut(): void {
    this.isAuth = false;
    this.emiAuthSubject();
  }
}
