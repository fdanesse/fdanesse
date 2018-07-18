import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  @Output() // https://ciphertrick.com/2017/07/24/parent-child-component-communication-angular/
  closeEvent: EventEmitter<null> = new EventEmitter<null>(); // creating an output event

  constructor(public authService: AuthService) {}

  ngOnInit() {}

  onLogin(provider: string) {
    this.close();
    this.authService.login(provider)
      .then( (user) => {
        // console.log('LoginComponent LOGIN:', user.user.uid); // FIXME: Perfil
      })
      .catch( (err) => {
        alert('No fue posible Autenticarse');
        console.log('LoginComponent AUTH ERROR:', err);
      });
    }

  close() {
    this.closeEvent.emit(null);
  }
}
