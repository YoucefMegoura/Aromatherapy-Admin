import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public authSubscription: Subscription | undefined;
  public authStatus: boolean | undefined;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authSubscription = this.authService.authSubject.subscribe(
      (isAuth: boolean) => {
        this.authStatus = isAuth;
      },
      (error: any) => {
        console.log(error)
      }
    )
  }

  onSignIn() {
    this.authService.signIn().then(
      () => {
        console.log('Sign in successful!');
        this.router.navigate(['stats']);
      }
    );
  }

  onSignOut() {
    this.authService.signOut();
  }

}
