import {Component, OnDestroy, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit{

  public authStatus: boolean | undefined;
  public authError: string | undefined;

  public authForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.authForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required),
    })

  }

  ngOnInit() {
    this.onSignIn(); //TODO:: REMOVE

  }

  onSignIn() {
    const email: string = this.authForm.value['email'];
    const password: string = this.authForm.value['password'];
    this.authService.signIn(email, password).then(
      () => {
        console.log('Sign in successful!');
        this.router.navigate(['oils']);
      }
    ).catch((error : any) => {
      this.authError = error;
      console.log(error)
    });
    console.log(this.authForm.value);
  }

  onSignOut() {
    this.authService.signOut();
  }

}
