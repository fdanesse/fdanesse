import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy {

  private userloggedSubscription: Subscription;
  public userlogged;

  constructor(public authService: AuthService) {
    this.userloggedSubscription = this.authService.obsLogged.subscribe(user => {
      this.userlogged = Object.assign({}, user); // user puede ser null
      if (this.userlogged && this.userlogged.uid) {
        console.log('*** Usuario Logueado', this.userlogged.uid);
      }
    });
  }

  onLogin(provider: string) {
    this.authService.login(provider)
      .then( (user) => {
        console.log('home.component onLogin:', user.user.uid);
      })
      .catch( (err) => {
        alert('No fue posible Autenticarse');
        console.log('AUTH ERROR:', err);
      });
    }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userloggedSubscription.unsubscribe();
  }
}
