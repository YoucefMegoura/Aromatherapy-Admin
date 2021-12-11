import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {

  public authSubscription: Subscription | undefined;
  public authStatus: boolean | undefined;

  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    this.authSubscription = this.authService.authSubject.subscribe(
      (isAuth: boolean) => {
        this.authStatus = isAuth;
      },
      (error: any) => {
        console.log(error)
      }
    )
    if (this.authStatus) {
      return true;
    } else {
      this.router.navigate(['/auth']);
      return false;
    }

  }
}
