import { Component, OnInit } from '@angular/core';

// import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';

// resalte de codigo: https://github.com/mattlewis92/angular-highlight-js#installation


@Component({
  selector: 'app-guias',
  templateUrl: './guias.component.html',
  styleUrls: ['./guias.component.css']
})
export class GuiasComponent implements OnInit {

  lenguajes: Array<string> = [
    'Angular', 'Css'
  ];

  temas = {
    'Css': [
      {'Titulo': 'Display Animation',
      'url': 'Display Animation.pdf'}
    ],
    'Angular': [
      {'Titulo': 'Instalar y Comenzar',
      'url': '01 - Instalar y Comenzar.pdf'},
      {'Titulo': 'FireStorage Comenzar',
      'url': '02 - FireStorage Comenzar.pdf'},
    ]
  };

  currentLenguaje;
  currentTemas;
  currentLesson;

  url = '';

  constructor(private storage: AngularFireStorage) {  }

  ngOnInit() {
  }

  lenguajeSelected(event) {
    this.currentLenguaje = null;
    this.currentTemas = null;
    this.currentLesson = null;

    const lenguaje = event.target.innerHTML;
    this.currentLenguaje = lenguaje;
    this.currentTemas = this.temas[lenguaje];
  }

  temaSelected(event) {
    const lesson = event.target.innerHTML;
    this.currentLesson = null;
    for (const leccion of this.temas[this.currentLenguaje]) {
      if (leccion['Titulo'] === lesson ) {
        this.currentLesson = leccion['url'];
        this.getDocumentLesson();
        break;
      }
    }
  }

  getDocumentLesson() {
    // 'Guias/Angular/Guia de Angular FireStorage.pdf'
    const path = 'Guias/' + this.currentLenguaje + '/' + this.currentLesson;
    const ref = this.storage.storage.ref(path);
    ref.getDownloadURL()
      .then(success => {
        console.log('SUCCES:', success);
        this.url = success.replace('https://firebasestorage.googleapis.com/v0/b/fdanesse-f2b2c.appspot.com/o/', '');
        // FIXME: Lo más fácil window.open(this.profileUrl, '_blank');
        // const blob = new Blob([success], {type: 'application/pdf'});
        // this.profileUrl = URL.createObjectURL(blob);
        })
      .catch(err => console.log('error', err));
      /* Dos formas más de obtener una referencia a un archivo
      const gsReference = storage.storage.refFromURL('gs://fdanesse-f2b2c.appspot.com/python_joven/imagenes/01.png')
      const httpsReference = storage.storage.refFromURL('https://firebasestorage.googleapis.com/v0/b/fdanesse-f2b2c.appspot.com/o/python_joven%2Fimagenes%2F01.png?alt=media&token=0e73509d-12d1-483c-af40-78733b4f89cf');
      */
  }
}
