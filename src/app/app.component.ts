import { Component, OnDestroy, OnInit} from '@angular/core';
import { AuthService } from './servicios/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs'; // Observable
import { FilesService } from './servicios/files.service';

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
  private userdataSubscription: Subscription;
  private bienvenida = false;
  public tipo = false;

  constructor(public authService: AuthService, public router: Router, public fileService: FilesService) {}

  ngOnInit() {
    // FIXME: ejemplo api route: https://angular.io/guide/router#activated-route
    this.listenLogin();
  }

  onComponentChange(component) {
    this.tipo = !Boolean(component['tipo']);
  }

  listenLogin() {
    this.userloggedSubscription = this.authService.obsLogged.subscribe(user => {
      if (user) {
        this.userlogged = Object.assign({}, user);
      }else {
        this.userlogged = Object.assign({}, null);
      }
      this.listenUserData(this.userlogged['email']);
    });
  }

  listenUserData(email: string) {
    if (this.userdataSubscription) {
      this.userdataSubscription.unsubscribe();
    }
    if (email !== undefined) {
      this.userdataSubscription = this.fileService.getDocument('registrados', email)
        .subscribe( user => {
          if (user) { // user['email'] === email
            this.welcome();
          }else {
            this.router.navigate(['/perfil']);
          }
      });
    }
  }

  welcome() {
    this.bienvenida = !this.bienvenida;
    const wel = document.getElementById('welcome');
    if (this.bienvenida) {
      wel.style.animation = 'in 0.6s both';
      setTimeout( function() {
        const w = document.getElementById('welcome');
        w.style.animation = 'out 0.6s both';
        return false;
      }, 3000);
    } else {
      wel.style.animation = 'out 0.6s both';
    }
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
    if (this.userloggedSubscription) {
      this.userloggedSubscription.unsubscribe();
    }
    if (this.userdataSubscription) {
      this.userdataSubscription.unsubscribe();
    }
  }
}
