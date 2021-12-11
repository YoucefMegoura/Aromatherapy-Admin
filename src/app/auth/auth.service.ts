import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  private isAuth = false;
  public authSubject = new Subject<boolean>();

  emiAuthSubject() : void {
    this.authSubject.next(this.isAuth);
  }

  signIn(): any {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.isAuth = true;
        this.emiAuthSubject();
        resolve(true);
      }, 1000);
    });
  }

  signOut(): void {
    this.isAuth = false;
    this.emiAuthSubject();
  }
}
