import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Subscription } from 'rxjs'; // Observable
import { FilesService } from '../../servicios/files.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'; // Form
import { Fduser } from '../../modelos/fduser';

// FIXME: Hay cambios en el API en los modelos de formularios que debo revisar: https://angular.io/api/forms/FormControlName#use-with-ngmodel


@Component({
  selector: 'app-userperfil',
  templateUrl: './userperfil.component.html',
  styleUrls: ['./userperfil.component.css']
})
export class UserperfilComponent implements OnInit, OnDestroy {

  public perfilbutton = true;
  public homebutton = true;

  private userloggedSubscription: Subscription;
  public userlogged = new Fduser();
  public userdata = new Fduser();
  private userdataSubscription: Subscription;

  public perfilForm: FormGroup;

  /* Comienza con una palabra de entre 3 y 15 caracteres, pueden seguir con varias palabras
  de 2 a 15 caracteres cada una, pero nunca tendrá mas de un espacio entre ellas y
  siempre termina en una letra, no se aceptan números, permite ñ y tildes.*/
  private names_pattern = '^[a-zA-ZÁ-Úá-ú]{2,15}( ?[a-zA-ZÁ-Úá-ú]{1,15})*[a-zA-ZÁ-Úá-ú]+$';
  /* Nº de 9 cifras */
  private telefonos_pattern = '^[0-9]{8,9}$';

  constructor(public authService: AuthService, public fileService: FilesService) { }

  ngOnInit() {
    this.settingFormControls();
    this.listenLogin();
  }

  settingFormControls() {
    this.perfilForm = new FormGroup({
      /* auth user data */
      photoURL: new FormControl('', [Validators.required]),
      uid: new FormControl('', [Validators.required]),
      displayName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      emailVerified: new FormControl('', [Validators.pattern('true')]),
      phoneNumber: new FormControl('', [
        Validators.pattern(this.telefonos_pattern) || Validators.nullValidator]),
      providerId: new FormControl('', [Validators.required]),

      /* personal user data */
      nombre: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern(this.names_pattern)]),
      apellido: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern(this.names_pattern)]),
      telefono: new FormControl('', [
        Validators.pattern(this.telefonos_pattern) || Validators.nullValidator])
    });
  }

  listenLogin() {
    this.userloggedSubscription = this.authService.obsLogged.subscribe(user => {
      if (user) {
        this.userlogged = Object.assign({}, user);
        this.userdata = new Fduser();
      }else {
        this.userlogged = new Fduser();
        this.userdata = new Fduser();
      }
      if (this.userlogged['email']) {
        this.listenUserData(this.userlogged['email']);
      }
    });
  }

  listenUserData(email: string) {
    if (this.userdataSubscription) {
      this.userdataSubscription.unsubscribe();
    }
    this.userdataSubscription = this.fileService.getDocument('registrados', email)
      .subscribe( user => {
        for (const prop in user) {
          if (prop) {
            this.userdata[prop] = user[prop];
          }
        }
        for (const prop in this.userdata) {
          if (prop) {
            this.perfilForm.get(prop).setValue(this.userlogged[prop] || this.userdata[prop]);
          }
        }
    });
  }

  save() {
    if (this.perfilForm.valid) {
      this.fileService.saveUser(this.perfilForm.value);
    }
  }

  delete() {
    this.fileService.deleteUser(this.userlogged.email);
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
