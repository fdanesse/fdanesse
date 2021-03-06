import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable, pipe, Subscription, BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase/app';
// import { map, take, tap } from 'rxjs/operators';

import { Fduser } from '../modelos/fduser';

// NOTA: Toda la autenticación se hace aquí.
// Debes escuchar userLogged que representa al usuario autenticado y logueado: this.authService.obsLogged.subscribe ...
// llama a logout de este componente para desloguearte

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private userLogged: Fduser = null;
  private _obs = new BehaviorSubject(this.userLogged);
  obsLogged = this._obs.asObservable();

  private __obs: Subscription;

  constructor(public afAuth: AngularFireAuth) {

    this.__obs = this.obs()
      .subscribe(user => {
        if (user) {
          const u = this.convertDataAuth(user);
          this.changeUser(u);
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
      const objeto = {uid, displayName, photoURL, email, emailVerified, phoneNumber, providerId};
      for (const key in objeto) {
        if (key) {
          usertemp[key] = objeto[key];
        }
      }
    }
    return usertemp;
  }

  login(provider: string) {
    // https://firebase.google.com/docs/auth/web/auth-state-persistence?authuser=0
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    console.log('AuthService LOGIN With:', provider);
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
