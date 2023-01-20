import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthDto } from './authdto';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.authData$.pipe(
      take(1),
      map((data: AuthDto | undefined) => {
        if (data) {
          return state.url === '/auth/login' || state.url === '/auth/register'
            ? this.router.createUrlTree([''])
            : true;
        } else {
          return state.url === '/auth/login' || state.url === '/auth/register'
            ? true
            : this.router.createUrlTree(['auth/login']);
        }
      })
    );
  }
}
