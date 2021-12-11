import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './auth/auth.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public authSubscription: Subscription | undefined;
  public authStatus: boolean | undefined;

  constructor(private authService: AuthService) {
  }


  ngOnInit(): void {
    this.authSubscription = this.authService.authSubject.subscribe(
      (isAuth: boolean) => {
        this.authStatus = isAuth;
      },
      (error: any) => {
        console.log(error)
    }
    )
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }


}
