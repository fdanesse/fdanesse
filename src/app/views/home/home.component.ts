import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Subscription, Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnDestroy, OnInit {

  private userloggedSubscription: Subscription;
  public userlogged;

  constructor(public authService: AuthService) {
    this.userloggedSubscription = this.authService.obsLogged.subscribe(user => {
      this.userlogged = Object.assign({}, user); // user puede ser null
      // if (this.userlogged && this.userlogged.uid) {}
    });
  }

  onLogin(provider: string) {
    this.authService.login(provider)
      // .then( (user) => {})
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

  ngOnInit() {
  }
}
