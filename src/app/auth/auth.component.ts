import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit{

  public authStatus: boolean | undefined;

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.onSignIn(); //TODO:: REMOVE

  }

  onSignIn() {
    this.authService.signIn().then(
      () => {
        console.log('Sign in successful!');
        this.router.navigate(['oils']);
      }
    );
  }

  onSignOut() {
    this.authService.signOut();
  }

}
