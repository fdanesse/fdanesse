import { Component, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from './servicios/auth.service';
// import { Subscription, Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'fdanesse';

  // private userloggedSubscription: Subscription;
  // public userlogged;

  constructor(public authService: AuthService) {
    /*
        this.userloggedSubscription = this.authService.obsLogged.subscribe(user => {
      this.userlogged = Object.assign({}, user); // user puede ser null
      // if (this.userlogged && this.userlogged.uid) {}
    });
    */
  }

  ngOnInit() {}

  onLogin(provider: string) {
    this.authService.login(provider)
      .then( (user) => {console.log(user); }) // FIXME: Perfil
      .catch( (err) => {
        alert('No fue posible Autenticarse');
        console.log('AUTH ERROR:', err);
      });
    }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    // this.userloggedSubscription.unsubscribe();
  }
}
