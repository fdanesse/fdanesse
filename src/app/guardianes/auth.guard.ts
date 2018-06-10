import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, pipe } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { AuthService } from '../servicios/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.afAuth.authState
        .pipe(
          take(1), map(authState => !! authState), tap(authenticated => {
          if (!authenticated) {
            window.alert('No tienes permisos para acceder a esta dirección.');
            this.router.navigate(['/home']);
          } // FIXME: autenticado y con permisos
        }));
  }

}
