import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';

// pdf-viewer read local file: https://github.com/VadimDez/ng2-pdf-viewer#render-local-pdf-file
// pdf-viewer search in the pdf: https://github.com/VadimDez/ng2-pdf-viewer#search-in-the-pdf
// FIXME: Agregar opciones de busqueda
import { PdfViewerModule, PDFProgressData } from 'ng2-pdf-viewer';

// resalte de codigo: https://github.com/mattlewis92/angular-highlight-js#installation


@Component({
  selector: 'app-guias',
  templateUrl: './guias.component.html',
  styleUrls: ['./guias.component.css']
})
export class GuiasComponent implements OnInit {

  public Object = Object;
  temas = Object.assign({
    'Python': [
      {'Titulo': 'Libro - pygame 1.8 en Español',
      'url': 'pygame 1.8 en Español.pdf'}
    ],
    'Css': [
      {'Titulo': 'Display Animation',
      'url': 'Display Animation.pdf'}
    ],
    'Angular': [
      {'Titulo': 'Instalar y Comenzar',
      'url': '01 - Instalar y Comenzar.pdf'},
      {'Titulo': 'FireStorage Comenzar',
      'url': '02 - FireStorage Comenzar.pdf'},
      {'Titulo': 'Libro - Angular from theory to practice',
      'url': 'Angular from theory to practice.pdf'}
    ],
    'Nodejs': [
      {'Titulo': 'Libro - Learn and Master Nodejs',
      'url': 'Learn and Master Nodejs.pdf'}
    ],
    'Unity 3D': [
      {'Titulo': 'Libro - Mobile VR Game Development with Unity for Human Beings',
      'url': 'Mobile VR Game Development with Unity for Human Beings.pdf'}
    ],
    'RegExp': [
      {'Titulo': 'Resumen',
      'url': 'Resumen.pdf'}
    ],
    'Php': [
      {'Titulo': 'Codeigniter - Instalación y Comenzar',
      'url': 'Codeigniter - Instalación y Comenzar.pdf'}
    ]
  });

  currentLenguaje;
  currentTemas;
  currentLesson;
  url = '';

  titulo = '';
  page = 1;
  totalPages: number;
  isLoaded = false;
  selected = [];

  constructor(private storage: AngularFireStorage) { }

  ngOnInit() { }

  lenguajeSelected(event) {
    this.currentLenguaje = null;
    this.currentTemas = null;
    this.currentLesson = null;

    const lenguaje = event.target.innerHTML;
    this.currentLenguaje = lenguaje;
    this.currentTemas = this.temas[lenguaje];

    const widget = event.target as HTMLElement;
    if (!this.selected.includes(widget)) {
      this.selected.forEach(element => {
        element.classList.remove('selected');
      });
      this.selected = [];
      widget.classList.add('selected');
      this.selected.push(widget);
    }
  }

  temaSelected(event) {
    const lesson = event.target.innerHTML;
    this.currentLesson = null;
    for (const leccion of this.temas[this.currentLenguaje]) {
      if (leccion['Titulo'] === lesson ) {
        this.titulo = this.currentLenguaje + ' - ' + lesson;
        this.currentLesson = leccion['url'];
        this.getDocumentLesson();
        break;
      }
    }
    const widget = event.target as HTMLElement;
    if (!this.selected.includes(widget)) {
      if (this.selected.length > 1) {
        const w = this.selected.pop();
        w.classList.remove('selected');
      }
      widget.classList.add('selected');
      this.selected.push(widget);
    }
  }

  getDocumentLesson() {
    // pdf-viewer https://medium.com/@vadimdez/render-pdf-in-angular-4-927e31da9c76
    this.url = '';
    this.isLoaded = false;
    this.page = 1;
    this.totalPages = 0;
    // 'Guias/Angular/Guia de Angular FireStorage.pdf'
    const path = 'Guias/' + this.currentLenguaje + '/' + this.currentLesson;
    const ref = this.storage.storage.ref(path);
    ref.getDownloadURL()
      .then(success => {
        this.url = success; // success.replace('https://firebasestorage.googleapis.com/v0/b/fdanesse-f2b2c.appspot.com/o/', '');
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

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
  }

  onProgress(progressData: PDFProgressData) {
    // FIXME: Agregar progressbar
    // console.log(progressData['loaded'], progressData['total']);
  }

  nextPage() {
    this.page++;
  }

  prevPage() {
    this.page--;
  }
}
