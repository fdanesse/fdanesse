import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Observable } from 'rxjs';

// pdf-viewer read local file: https://github.com/VadimDez/ng2-pdf-viewer#render-local-pdf-file
// pdf-viewer search in the pdf: https://github.com/VadimDez/ng2-pdf-viewer#search-in-the-pdf
// FIXME: Agregar opciones de busqueda
import { PDFProgressData } from 'ng2-pdf-viewer'; // PdfViewerModule
import { FilesService } from '../../servicios/files.service';

// resalte de codigo: https://github.com/mattlewis92/angular-highlight-js#installation

// FIXME: implementar alguna forma de acceder a una página en particular.


@Component({
  selector: 'app-guias',
  templateUrl: './guias.component.html',
  styleUrls: ['./guias.component.css'],
  providers: [FilesService]
})
export class GuiasComponent implements OnInit, OnDestroy {

  lenguajes = [];

  currentLenguaje;
  currentTemas;
  currentLesson;
  pdfURL = '';

  titulo = '';
  page = 1;
  totalPages: number;
  isLoaded = false;
  selected = [];

  lenguajesSubscription;
  temasSubscription;

  constructor(public filesService: FilesService) {
    this.getLenguajes();
  }

  getLenguajes() {
    // Guias tiene un Array de Documentos. Uno para cada lenguaje.
    if (this.lenguajesSubscription) {
      this.lenguajesSubscription.unsubscribe();
    }
    this.lenguajesSubscription = this.filesService.getCollection('Guias').
      subscribe(data => {
        this.lenguajes = [];
        if (data) {
          data.map((val) => { // data == Array - val == Array
            for (const leng in val) {
              if (leng) {
                this.lenguajes.push(leng);
              }
            }
          });
        }
      });
  }

  ngOnInit() { }

  ngOnDestroy() {
    if (this.temasSubscription) {
      this.temasSubscription.unsubscribe();
    }
    if (this.lenguajesSubscription) {
      this.lenguajesSubscription.unsubscribe();
    }
  }

  lenguajeSelected(event) {
    // El usuario selecciona un lenguaje
    this.currentTemas = null;
    this.currentLesson = null;
    this.currentLenguaje = event.target.innerHTML;
    const widget = event.target as HTMLElement;
    if (!this.selected.includes(widget)) {
      this.selected.forEach(element => {
        element.classList.remove('selected');
      });
      this.selected = [];
      widget.classList.add('selected');
      this.selected.push(widget);
    }

    if (this.temasSubscription) {
      this.temasSubscription.unsubscribe();
    }
    this.temasSubscription = this.filesService.getDocument('Guias', this.currentLenguaje).
      subscribe(data => {
        this.currentTemas = [];
        if (data) {
          const array = data[this.currentLenguaje];
          for (const leng in array) {
            if (leng) {
              this.currentTemas.push(array[leng]); // {Titulo: ?, pdf: ?}
            }
          }
        }
      });
  }

  leccionSelected(event) {
    // El usuario selecciona una lección
    const lesson = event.target.innerHTML;
    this.currentLesson = null;
    const widget = event.target as HTMLElement;
    if (!this.selected.includes(widget)) {
      if (this.selected.length > 1) {
        const w = this.selected.pop();
        w.classList.remove('selected');
      }
      widget.classList.add('selected');
      this.selected.push(widget);
    }

    for (const lec in this.currentTemas) {
      if (this.currentTemas[lec]['Titulo'] === lesson) {
        this.titulo = this.currentLenguaje + ' - ' + lesson;
        this.currentLesson = this.currentTemas[lec]['pdf'];
        this.getDocumentLesson();
        break;
      }
    }
  }

  getDocumentLesson() {
    // Se carga el Documento de la lección seleccionada
    // pdf-viewer https://medium.com/@vadimdez/render-pdf-in-angular-4-927e31da9c76
    this.pdfURL = '';
    this.isLoaded = false;
    this.page = 1;
    this.totalPages = 0;
    const path = 'Guias/' + this.currentLenguaje + '/' + this.currentLesson;
    const ref = this.filesService.getStorageDirectoryReference(path);
    ref.getDownloadURL()
      .then(success => {
        this.pdfURL = success;
        })
      .catch(err => console.log('ERROR getDocumentLesson:', err));
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
