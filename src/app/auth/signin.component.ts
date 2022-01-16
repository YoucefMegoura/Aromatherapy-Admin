import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import firebase from "firebase/compat";
import UserCredential = firebase.auth.UserCredential;
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit{

  public authStatus: boolean | undefined;
  public authError: string | undefined;

  public authForm: FormGroup;

  constructor(private authService: AuthService, private router: Router, private spinner: NgxSpinnerService,) {
    this.authForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required),
    })

  }

  ngOnInit() {
  }

  onSignIn() {
    this.spinner.show();
    const email: string = this.authForm.value['email'];
    const password: string = this.authForm.value['password'];
    this.authService.signIn(email, password).then(
      (userCredential: UserCredential) => {
        console.log(userCredential);
        this.router.navigate(['stats']);
        this.spinner.hide();
      }
    ).catch((error : any) => {
      this.authError = error;
      alert('There is an authentication problem. please contact the support.');
      console.log(error)
      this.spinner.hide();
    });
  }

  onSignOut() {
    this.spinner.show();
    this.authService.signOut().then(() => {
      console.log('SignOut Successful');
      this.spinner.hide();
    }).catch(e => {
      console.log(e)
      alert('There is an authentication problem. please contact the support.');
      this.spinner.hide();
    });
  }

}
