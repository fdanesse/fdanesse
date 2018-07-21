import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs'; // pipe

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
  private userdataSubscription: Subscription;
  private userdata: Fduser;
  private lectoresSubscription: Subscription;
  private lectores = new Array();

  constructor(private router: Router, private authService: AuthService, public filesService: FilesService) {

    this.userloggedSubscription = this.authService.obsLogged.subscribe(user => {
      this.userlogged = Object.assign({}, user); // user puede ser null
      if (this.userlogged['email']) {
        this.listenUserData(this.userlogged['email']);
      }
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

  listenUserData(email: string) {
    if (this.userdataSubscription) {
      this.userdataSubscription.unsubscribe();
    }
    this.userdataSubscription = this.filesService.getDocument('registrados', email)
      .subscribe( user => {
        this.userdata = Object.assign({}, user);
    });
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const ret = this.lectores.includes(this.userlogged.email) && this.userdata['email'] === this.userlogged.email;
      if (!ret) {
        window.alert('Debes estar registrado como lector para acceder a esta dirección.');
        this.router.navigate(['/home']);
        return false;
      }
      return ret;
  }

  ngOnDestroy() {
    this.lectoresSubscription.unsubscribe();
    this.userloggedSubscription.unsubscribe();
  }

}
