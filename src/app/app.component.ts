import { Component, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from './servicios/auth.service';
import { Router } from '@angular/router';
// import { Subscription, Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'fdanesse';
  public loginActive = false;

  // private userloggedSubscription: Subscription;
  // public userlogged;

  constructor(public authService: AuthService, public router: Router) {
    /*
        this.userloggedSubscription = this.authService.obsLogged.subscribe(user => {
      this.userlogged = Object.assign({}, user); // user puede ser null
      // if (this.userlogged && this.userlogged.uid) {}
    });
    */
  }

  ngOnInit() {}

  /*
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
  */

  toggleLoginActive() {
    this.loginActive = !this.loginActive;
    // http://www.developphp.com/video/JavaScript/Start-Stop-CSS-keyframes-animation-with-JavaScript
    const login = document.getElementById('login'); // document.querySelector('login');
    if (this.loginActive) {
      login.style.animation = 'in 0.5s both';
    } else {
      login.style.animation = 'out 0.5s both';
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  ngOnDestroy() {
    // this.userloggedSubscription.unsubscribe();
  }
}
