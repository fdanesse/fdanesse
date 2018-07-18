import { Component, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from './servicios/auth.service';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

// NOTA: El cuadro de dialogo id="login" contiene botones para autenticación con google, twitter y facebook.
// Se activa cuando el usuario hace click en el botón login de id='loginbox'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'fdanesse';
  public loginActive = false;
  private userloggedSubscription: Subscription;
  public userlogged = Object.assign({}, null);

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit() {
    this.listenLogin();
  }

  listenLogin() {
    this.userloggedSubscription = this.authService.obsLogged.subscribe(user => {
      this.userlogged = Object.assign({}, user);
      /* FIXME: Si el usuario está en la base de datos, no hacemos nada
      Si no está en la base, vamos al perfil de usuarios */
      // if (this.userlogged && this.userlogged.uid) {}
    });
  }

  toggleLoginActive() {
    // habre y cierra cuadro de autenticación
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
    this.userloggedSubscription.unsubscribe();
  }
}
