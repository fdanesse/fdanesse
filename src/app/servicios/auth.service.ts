import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, pipe, Subscription, BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase/app';
import { map, take, tap } from 'rxjs/operators';

import { Fduser } from '../modelos/fduser';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private userLogged: Fduser = null;
  private _obs = new BehaviorSubject(this.userLogged);

  // Suscribirse aquí para observar usuario logueado
  // this.authService.obsLogged.subscribe ...
  obsLogged = this._obs.asObservable();

  private __obs: Subscription;

  constructor(public afAuth: AngularFireAuth) {

    // userLogged Mantiene los datos del usuario logueado
    this.__obs = this.obs()
      .subscribe(user => {
        if (user) {
          this.changeUser(this.convertDataAuth(user));
        }else {
          this.changeUser(null);
        }
      });
  }

  private changeUser(user: Fduser) {
    this._obs.next(user);
  }

  private obs(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  private convertDataAuth (user: any) {
    const usertemp = new Fduser();
    if (user) {
      const authUser = Object.assign({}, user);
      const { uid, displayName, photoURL, email, emailVerified, phoneNumber } = authUser;
      const providerId = authUser.providerData[0].providerId;
      usertemp.setMoliUser({
        uid, displayName, photoURL, email,
        emailVerified, phoneNumber, providerId });
    }
    return usertemp;
  }

  login(provider: string) {
    switch (provider) {
      case 'google': {
        return this.afAuth.auth.signInWithPopup(
          new firebase.auth.GoogleAuthProvider());
      }
    }
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

  ngOnDestroy () {
    this.__obs.unsubscribe();
  }
}
