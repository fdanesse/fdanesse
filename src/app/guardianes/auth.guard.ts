import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, pipe, Subscription } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { AuthService } from '../servicios/auth.service';
import { FilesService } from '../servicios/files.service';
import { Fduser } from '../modelos/fduser';

/*
  userlogged es el usuario logueado
  roots los uid de los usuarios en users/roots/rootsId[]
  Este guard solo deja pasar a usuarios root
*/

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, OnDestroy {

  private userloggedSubscription: Subscription;
  private userlogged;

  private rootsSubscription: Subscription;
  private roots = new Array();

  constructor(
    private router: Router,
    private authService: AuthService,
    public filesService: FilesService
  ) {

    // Observando al usuario logueado
    this.userloggedSubscription = this.authService.obsLogged.subscribe(user => {
      this.userlogged = Object.assign({}, user); // user puede ser null
    });

    // Observando los usuarios roots registrados
    this.rootsSubscription = this.filesService.getDocument('users', 'roots').
      subscribe(data => {
        this.roots = new Array();
        for (const user in data['rootsId']) {
          if (user) {
            this.roots.push(data['rootsId'][user]);
          }
        }
      });
    }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.afAuth.authState
        .pipe(
          take(1), map(authState => !! authState), tap(authenticated => {
          if (!authenticated) {
            window.alert('No tienes permisos para acceder a esta dirección.');
            this.router.navigate(['/home']);
          }else {
            if (this.roots.includes(this.userlogged.uid)) {
              return true;
            }else {
              window.alert('No tienes permisos para acceder a esta dirección.');
              this.router.navigate(['/home']);
            }
          }
        }));
  }

  ngOnDestroy() {
    this.rootsSubscription.unsubscribe();
    this.userloggedSubscription.unsubscribe();
  }

}
