import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs'; // pipe
import { map, take, tap } from 'rxjs/operators';

import { AuthService } from '../servicios/auth.service';
import { FilesService } from '../servicios/files.service';
import { Fduser } from '../modelos/fduser';

/*
  userlogged es el usuario logueado
  lectores los emails de los usuarios en users/lectores
  Este guard solo deja pasar a usuarios lectores
*/

@Injectable({
  providedIn: 'root'
})
export class LectorsGuard implements CanActivate, OnDestroy {

  private userloggedSubscription: Subscription;
  private userlogged: Fduser;

  private lectoresSubscription: Subscription;
  private lectores = new Array();

  constructor(
    private router: Router,
    private authService: AuthService,
    public filesService: FilesService
  ) {
    // Observando al usuario logueado
    this.userloggedSubscription = this.authService.obsLogged.subscribe(user => {
      this.userlogged = Object.assign({}, user); // user puede ser null
    });

    this.lectoresSubscription = this.filesService.getCollection('lectores').
      subscribe(docs => {
        if (docs) {
          this.lectores = new Array();
          for (const doc of docs) {
            this.lectores.push(doc['email']);
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
            window.alert('Debes estar registrado como lector para acceder a esta dirección.');
            this.router.navigate(['/home']);
          }else {
            if (this.lectores.includes(this.userlogged.email)) { // FIXME: asegurar que esté registrado
              console.log('AUTH', this.lectores.includes(this.userlogged.email).toString());
              return true;
            }else {
              window.alert('Debes estar registrado como lector para acceder a esta dirección.');
              this.router.navigate(['/home']);
            }
          }
        }));
  }

  ngOnDestroy() {
    this.lectoresSubscription.unsubscribe();
    this.userloggedSubscription.unsubscribe();
  }

}
